import {
	createAsyncThunk,
	createSlice,
	createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes.js';

export const fetchPosts = createAsyncThunk('posts/allPost', async () => {
	const response = await axios.get(routes.allPost());
	return response.data;
});

export const fetchInfoPost = createAsyncThunk(
	'posts/getPostById',
	async ({postId, token}) => {
		const response = await axios.get(routes.getPostsById(postId, token));
		return response.data;
	}
);
export const fetchPostCategory = createAsyncThunk(
	'posts/postCategories',
	async (id) => {
		const response = await axios.get(routes.categoriesPost(id));
		return {data: response.data, idPost: id};
	}
);

export const fetchPostLike = createAsyncThunk('posts/postLike', async (id) => {
	const response = await axios.get(routes.likesPost(id));
	return response.data;
});

export const fetchPostComments = createAsyncThunk(
	'posts/postComments',
	async (id) => {
		const response = await axios.get(routes.commentsPost(id));
		return response.data;
	}
);

export const fetchPostLikeCount = createAsyncThunk('posts/postLikeCount', async (id) => {
	const response = await axios.get(routes.countLike(id));
	return response.data;
});

export const fetchPostCommentsCount = createAsyncThunk('posts/postCommentsCount', async (id) => {
	const response = await axios.get(routes.countComment(id));
	return response.data;
});

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState({
	postCategories: {},
	postLikes: {},
	postComments: {},
	postLikesCount: {},
	postCommentsCount: {},
	error: null,
	loading: true,
});

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		addPost: postsAdapter.addOne,
		updatePost: postsAdapter.updateOne,
		updateCategoryPost(state, { payload }) {
		  state.postCategories[payload.postId] = payload.category;
		},
		setCurrentPage(state, { payload }) {
		  state.currentPage = payload;
		},
	},
	extraReducers: (builder) => {
		builder
		.addCase(fetchPosts.pending, (state) => {
			state.loading = true;
		})
		.addCase(fetchPosts.fulfilled, (state, { payload }) => {
			state.loading = false;
			postsAdapter.addMany(state, payload);
		})
		.addCase(fetchPosts.rejected, (state) => {
			state.loading = false;
			state.error = 'Error load post try later :(';
		})
		.addCase(fetchPostCategory.fulfilled, (state, { payload }) => {
			state.postCategories[payload.idPost] = payload.data;
		})
		.addCase(fetchPostLike.fulfilled, (state, { payload }) => {
			state.postLikes[payload.postId] = {
				countLike: payload.length,
				likeInfo: payload,
			};
		})
		.addCase(fetchPostComments.fulfilled, (state, { payload }) => {
			state.postComments[payload.postId] = {
				countComments: payload.length,
				comments: payload,
			};
		})
		.addCase(fetchInfoPost.pending, (state, { payload }) => {
			state.loading = true;
		})
		.addCase(fetchInfoPost.fulfilled, (state, { payload }) => {
			state.entities[payload[0].id] = payload[0];
			state.loading = false;
		})
		.addCase(fetchPostLikeCount.fulfilled, (state, { payload }) => {
			state.postLikesCount[payload.idPost] = payload.countLike;
		})
		.addCase(fetchPostCommentsCount.fulfilled, (state, { payload }) => {
			state.postCommentsCount[payload.idPost] = payload.countComment;
		})
		.addCase(fetchInfoPost.rejected, (state) => {
			state.error = 'This page not found';
			state.loading = false;
		});
	},
});

export const { actions } = postsSlice;

export const selectors = postsAdapter.getSelectors((state) => state.posts);

export const getFetchStatus = (state) => state.posts.loading;

export default postsSlice.reducer;
