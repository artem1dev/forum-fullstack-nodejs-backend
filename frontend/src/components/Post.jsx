import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isNull from 'lodash/isNull';

import routes from '../routes.js';

import { fetchUserInfo } from './slices/usersSlice.js';
import { fetchPostLikeCount, fetchPostCommentsCount } from './slices/postsSlice.js';

const normalizaDate = (date) => {
	const currentDate = new Date(date);
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	return `${currentDate.getDate()} ${
		monthNames[currentDate.getMonth()]
	}, ${currentDate.getFullYear()}`;
};

const hiddenText = (text) => {
	const newText = text.length > 140 ? text.slice(0, 140) + '...' : text;
	return newText;
};

export default function Post({ post }) {
	const dispatch = useDispatch();
	const { currentUser, token } = JSON.parse(
		localStorage.getItem('currentUser')
	);
	const users = useSelector((state) => state.users.entities);
	const likes = useSelector((state) => state.posts.postLikesCount[post.id]);
	const comments = useSelector((state) => state.posts.postCommentsCount[post.id]);
	
	const id = post?.author_id;
	useEffect(() => {
			dispatch(fetchUserInfo({id, token}));
			dispatch(fetchPostLikeCount(post?.id));
			dispatch(fetchPostCommentsCount(post?.id));
	}, []);
	const photoUser = users[post.author_id]?.profile_pic || null;
	return post && (
		<div key={post.id} className="PostBlock">
			<div className="postContent">
				<div>
					<div>
						<h5>{post?.title}</h5>
					</div>
					<p>
						By <a href={`/profile/${post?.author_id}`}>{post?.login + ' '}
							<img src={!isNull(photoUser)
								? routes.getPhoto(photoUser)
								: '/avatars/default.png'
							}
							className="userimg"/>
						</a>
					</p>
				</div>
				<div>
					<p>
						{post.content.length < 329
						? post.content
						: hiddenText(post.content)}
					</p>
				</div>
				<div>
					<div>
						<div>
							<div>
								Published: {normalizaDate(post.publish_date)}
							</div>
						</div>
						<div>
							<div>
								<img src='/comment.png'	className="userimg"/>
								<span>{' ' + comments}</span>
							</div>
							<div>
								<img src='/like.png' className="userimg"/>
								<span>{' ' + likes}</span>
							</div>
						</div>
					</div>
					<br/>
					<div>
						<a href={`/post/${post?.id}`}>
							<button type="submit" className="Submit_btn">
								Reading
							</button>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

