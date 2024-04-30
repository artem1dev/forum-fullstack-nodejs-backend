import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Select from 'react-select';

import routes from '../routes.js';

import {
    fetchAllCategory,
    selectorsCategoty,
} from './slices/categoriesSlice.js';

const validationCreatePost = yup.object({
    title: yup.string().required('Cannot be blank').trim(),
    content: yup.string().required('Cannot be blank').trim(),
    categories: yup
      .array()
      .min(1, 'Pick at least 1 tags')
      .max(3, 'Up to 3 pieces')
      .of(
            yup.object().shape({
                label: yup.string().required(),
                value: yup.string().required(),
            })
      ),
});

export default function CreatePost() {
    const { currentUser, token } = JSON.parse(
		localStorage.getItem('currentUser')
	);
    const dispatch = useDispatch();
    const categories = useSelector(selectorsCategoty.selectAll);
    const inputRef = useRef();
    const navigate = useNavigate();
    const options = categories.map((item) => {
        return {
            value: item?.id,
            label: item?.title,
        };
    });
    useEffect(() => {
        inputRef.current?.focus();
        dispatch(fetchAllCategory(token));
    }, []);
  
    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            categories: []
        },
        validationSchema: validationCreatePost,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async ({ categories, title, content }) => {
            
            let categoriesIds = []
            categories.forEach((item) => {
                categoriesIds.push(item.value)
            })
            categoriesIds = categoriesIds.join(', ')
            const data = { title, content, categoriesIds};

            try {
                const response = await axios.post(routes.createPost(token), data);

                toast.info(response.data.massage);
                navigate('/');
            } catch (err) {
                if (err.isAxiosError && err.response.status === 400) {
                    const responseErrors = err.response.data.errors.errors;
                    responseErrors.map((err) => toast.error(`${err.param}: ${err.msg}`));
                    inputRef.current?.select();
                    return;
                }
                throw err;
            }
        },
    });
  
    return (
        <div className="CreatePostBlock">
            <form onSubmit={formik.handleSubmit} className="CreatePostForm">
                <h1>
                    Create post
                </h1>
                <div>
                    <div>
                        <div>
                            <label htmlFor="title">
                                Title
                            </label>
                            <span className="Errors">
                                {formik.errors.title ? ' ' + formik.errors.title : null}
                            </span>
                        </div>
                        <div>
                            <input
                                id="title"
                                className="titleInput"
                                name="title"
                                placeholder="Enter title"
                                ref={inputRef}
                                onChange={formik.handleChange}
                                value={formik.values.title}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="content">
                            Content
                        </label>
                        <span className="Errors">
                            {formik.errors.content ? ' ' + formik.errors.content : null}
                        </span>
                    </div>
                    <div>
                        <textarea
                            id="content"
                            className="contentInput"
                            name="content"
                            type="text"
                            placeholder="Enter content"
                            onChange={formik.handleChange}
                            value={formik.values.content}
                        />
                    </div>
                </div>
                <div>
                    <button type="submit" className="Submit_btn">
                        Create post
                    </button>
                </div>
            </form>
        </div>
    );
};