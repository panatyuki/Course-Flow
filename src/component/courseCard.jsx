import classes from '../style/courseCard.module.css';
import lessonIcon from '../images/imagesCourseCard/lessonIcon.svg';
import hoursIcon from '../images/imagesCourseCard/hoursIcon.svg';

function CourseCard( { detailCourse }) {
  return (
    <div key={detailCourse.id} className={classes.courseCard}>
      <img src={detailCourse.img} alt={detailCourse.name} className={classes.imgCourseCard} />
      <div className={classes.textCourseCard}>
        <p className='cf-body-3' style={{ color: '#F47E20' , fontWeight: '400' }}>Course</p>
        <h3 style={{ lineHeight: '0' }}>{detailCourse.name}</h3>
        <p className='cf-body-2' style={{ color: '#646D89' }} >{detailCourse.description}</p>
      </div>   
      <div className={classes.footerCourseCard}> 
        <div className={classes.detailFooterCourseCard}>
          <img src={lessonIcon} alt='lessonIcon' />
          <span className='cf-body-2'>{detailCourse.lesson} Lesson</span>
        </div>
        <div className={classes.detailFooterCourseCard}>
          <img src={hoursIcon} alt='hoursIcon' />
          <span className='cf-body-2'>{detailCourse.hours} Hours</span>
        </div>
      </div>   
    </div>
  );
}

export default CourseCard;