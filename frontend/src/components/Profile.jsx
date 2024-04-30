import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from './slices/usersSlice.js';
import { fetchPosts, selectors } from './slices/postsSlice.js';
import { useParams } from 'react-router-dom';
import Post from './Post.jsx';
import { isNull } from 'lodash';
import routes from '../routes.js';

export default function Profile() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const user = useSelector((state) => state.users.entities);
	const posts = useSelector(selectors.selectAll);
	const postsUser = posts.filter((post) => post.author_id == id);
	const { currentUser, token } = JSON.parse(
		localStorage.getItem('currentUser')
	);
	useEffect(() => {
		dispatch(fetchUserInfo({id, token}));
		dispatch(fetchPosts(token)); 
	}, []);

	return (
		<>
			<div className="divProfileBlock">
				<div className="ProfileForm">
					<div>
						<div className="top-block">
							<h1>
								{user[id]?.login}
							</h1>
							<span className="roleTitle">{user[id]?.title} </span> 
							<img
								className="profimg"
								src={!isNull(user[id]?.profile_pic)
									? routes.getPhoto(user[id]?.profile_pic)
									: '/avatars/default.png'
								}
								alt="" 
							/>
						</div>
					</div>
					<div>
						<div>
							<span>About</span>
							<div>
								<div className="profileitem">
									Login: <span>{user[id]?.login}</span>
								</div>
							</div>
							<button className="Edit_btn">
								Profile editing
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="All_Posts">
				{postsUser.map((post) => (
					<Post post={post}/>
				))}
			</div>
		</>
	);
};

