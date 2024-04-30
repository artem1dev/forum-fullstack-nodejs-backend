import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import NotFound from './404';
import routes from '../routes.js';
import CommentsPost from './CommentsPost.jsx';
import CreateCommentPost from './CreateCommentPost';

import {
	fetchAllCommentPost,
	selectorsComment,
} from './slices/commentSlice.js';
import {
	fetchInfoPost,
	fetchPostLike,
	fetchPostLikeCount
} from './slices/postsSlice.js';

import { fetchUsers } from './slices/usersSlice.js';

const createLikePost = async (id, token, setLike, like) => {
	await axios.post(routes.createPostLike(id, token), { type: 'true' });
	setLike(like + 1);
};

const deleteLikePost = async (id, token, setLike, like) => {
	await axios.delete(routes.deletePostLike(id, token));
	setLike(like - 1);
};

export default function FullPost () {
	const { currentUser, token } = JSON.parse(
		localStorage.getItem('currentUser')
	);
	const dispatch = useDispatch();
	const postId = useParams().id;
	const post = useSelector((state) => state.posts.entities[postId]);
	const users = useSelector((state) => state.users.entities);
	const comments = useSelector(selectorsComment.selectAll);
	const error = useSelector((state) => state.posts.error);
	const likeCount = useSelector((state) => state.posts.postLikesCount[postId]);
	const postLike = useSelector((state) => state.posts.postLikes[postId]);
	const [editData, setEditData] = useState('');
	const [isLike, setLike] = useState(false);
	const [likes, setCountLike] = useState(0);
	const [isEdite, setEdite] = useState(false);
	useEffect(() => {
		dispatch(fetchUsers(token));
		dispatch(fetchInfoPost({postId, token}));
		dispatch(fetchAllCommentPost(postId));
		dispatch(fetchPostLike(postId));
		dispatch(fetchPostLikeCount(postId));
	}, []);

	useEffect(() => {
		if (post?.content !== undefined) {
			setEditData(post?.content);
		}
	}, [post]);

	useEffect(() => {
		const isUserLike = postLike;
		if (isUserLike && isUserLike.likeInfo !== 'Empty') {
			isUserLike.likeInfo.find((item) => item.author_id === currentUser);
			if (isUserLike.length !== 0) {
				setLike(true);
			}
		}
		setCountLike(postLike?.countLike);
	}, [postLike]);

	useEffect(() => {}, [comments]);
	
	const editePost = async (values) => {
		setEdite(false);
		window.location.reload(false);
		// await axios.patch(routes.updateDataPost(postId, token));
		dispatch(fetchInfoPost({postId, token}));
	};

	return error ? (
		<NotFound />
	) : (
		<div className="FullPostBlock">
			<div className="FullPostContent">
				<h1 className="FullPostTitle">
					{post?.title}
				</h1>
				<hr className="bg-white"/>
				<div className="FullPostText">
					<p>
						{post?.content}
					</p>
					{
						currentUser.user_id === post?.author_id ? (
							isEdite ? (
								<>
									<form onSubmit={editePost} className="EditPostForm">
										<textarea
											id="edit_content"
											className="edit_content"
											name="edit_content"
											type="text"
											onChange={(e) => setEditData(e.target.value)}
											value={editData}
										/>
										<div className="EditPostBtnBlock">
											<button type="submit" className="SaveEdit_btn">
												Save edit
											</button>
											<button onClick={() => setEdite(false)} className="CancelEdit_btn">
												Cancel
											</button>
										</div>
									</form>
								</>
							) : (
								<div>
									<button className="EditPost_btn" onClick={() => (setEdite(true))}>
										Edit
									</button>
								</div>
							)
						): null
					}
				</div>

				<div>
					<button
							onClick={() => {
								if(isLike){
									setLike(!isLike);
									deleteLikePost(postId, token, setCountLike, likeCount);
								}
								else {
									setLike(!isLike);
									createLikePost(postId, token, setCountLike, likeCount);
								}
							}}
						>
						<img src='/like.png' className="userimg"/>
					</button>
					<p>{likeCount}</p>
				</div>
				<h2>Comments</h2>
				<hr className="bg-white"/>
				<CreateCommentPost postId={postId} />
				<div className="FullPostComment">
					<ul>
					{users &&
						comments.map((comment) => {
							return (
								<li key={comment.id}>
								<CommentsPost
									idComment={comment.id}
									comment={comment}
									users={users}
								/>
								</li>
							);
						})}
					</ul>
				</div>

			</div>
		</div>
	);
};
