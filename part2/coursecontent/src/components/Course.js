import React from 'react';
import Content from './Content';
import Header from './Header';

const Course = ({ course }) => {



    return (
        <>
            <Header course={course.name} />
            <Content content={course} />

        </>
    )
}

export default Course;