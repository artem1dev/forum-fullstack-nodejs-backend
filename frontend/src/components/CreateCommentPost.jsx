import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import routes from '../routes.js';
import axios from 'axios';
import { actions } from './slices/commentSlice.js';

const validationComment = yup.object({
  	content: yup.string().required("comment can't be empty").trim(),
});

export default function CreateCommentPost ({ postId }) {

	const dispatch = useDispatch();
	const { currentUser, token } = JSON.parse(
		localStorage.getItem('currentUser')
	);

	const inputRef = useRef();
	const [isEdite, setEdite] = useState(false);
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const formik = useFormik({
		initialValues: {
			content: '',
		},
		validationSchema: validationComment,
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: async (values) => {
		try {
			console.log(values.content)
			const response = await axios.post(
				routes.createPostcomment(postId, token),
				{ content: values.content }
			);
			toast.info(response.data.massage);
			const publish_date = new Date();
			const author_id = currentUser.id;
			const post_id = postId;
			console.log();
			dispatch(
				actions.addComment({
					id: response.data.id_comment.id,
					post_id,
					author_id,
					...values,
					publish_date,
				})
			);
			formik.values.content = '';
		} catch (err) {
			if (err.isAxiosError) {
				const responseErrors = err.response.data.message;
				toast.error(responseErrors);
				return;
			}
			throw err;
		}
		},
		onChange: async () => {
			
		}
	});

	return (
		<form onSubmit={formik.handleSubmit} className="CreateCommentPostForm">
			<div>
				<div>
					<label htmlFor="content">
						Add a comment:
					</label>
				</div>
				<textarea
					id="content"
					className='CommentInput'
					name="content"
					type="text"
					placeholder="Enter comment"
					onClick={(e) => setEdite(true)}
					onChange={formik.handleChange}
					value={formik.values.content}
					required
				/>
			</div>
			{isEdite ? (
				<div className="CommentBtnBlock">
					<button className="PostComment_btn" type="submit">
						Comment
					</button>
				</div>
				) : null
			}
		</form>
	);
};

