import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Post from './Post.jsx';

import { fetchPosts, selectors } from './slices/postsSlice.js';

export default function Home() {
	const posts = useSelector(selectors.selectAll);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchPosts());
	}, []);
	return (
		posts && (
			<>
				<div className="All_Posts">
					{posts.map((post) => (
						<Post post={post} />
					))}
				</div>
			</>
		) 
	);
};
