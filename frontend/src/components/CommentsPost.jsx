import React from 'react';
import routes from '../routes.js';

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
	}, ${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}` ;
};

export default function CommentsPost ({ idComment, comment, users }) {

	return (
		<div className="Comment_Block">
			<div className="Comment_Header">
				<a href={`/profile/${comment?.author_id}`}>
					<span>
						<img
							className="commentimg"
							src={users[comment?.author_id]?.profile_pic
								? routes.getPhoto(users[comment?.author_id].profile_pic)
								: '/avatars/default.png'
							}/>
						{users ? ' ' + users[comment?.author_id]?.login : null}
					</span>
				</a>
				<span>
					{normalizaDate(comment?.publish_date)}
				</span>
			</div>
			<div className="">
				<p>{comment?.content}</p>
			</div>
		</div>
	);
};
