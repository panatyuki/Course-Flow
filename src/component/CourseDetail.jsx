import classes from '../style/CourseDetail.module.css';
import arrowBack from '../images/arrow_back.svg';

function CourseDetail (){
  return (<div className={classes.container}>
    <div className={classes.dataContainer}>
      <button className={classes.buttonBack}>
        <img src={arrowBack} /> Back
      </button>
      <div>
        <iframe width="740" height="460" src="https://www.youtube.com/embed/9em32dDnTck" allowFullScreen frameBorder="0"></iframe>
        <div>
          <h2>Course Detail</h2>
          <div>
            Lorem ipsum dolor sit, amet consectetur adipisicing 
            elit. Hic explicabo inventore at sequi veniam esse 
            atque similique necessitatibus? Illo, tenetur. Iure 
            eveniet deleniti dolor eaque similique repudiandae, 
            tenetur quod fugiat sapiente neque sint in distinctio 
            molestiae hic animi at praesentium magni, laboriosam 
            illum ipsum fuga pariatur molestias atque sunt! Ipsum 
            aut fuga minima a quas ullam culpa obcaecati quaerat 
            alias fugiat quae error doloremque accusamus magni 
            aperiam autem amet, exercitationem itaque. Iusto 
            delectus, tenetur omnis adipisci placeat cum illo 
            vero inventore quasi quidem at, ex ipsa quas soluta 
            praesentium, natus quae qui asperiores dolorum sit 
            optio non. Quas excepturi, repudiandae, blanditiis 
            voluptates consectetur incidunt quos accusantium 
            consequuntur unde suscipit architecto possimus enim, 
            impedit facere necessitatibus? Provident at 
            necessitatibus nam numquam corrupti obcaecati, 
            iusto veritatis esse quae quas repellendus officiis 
            libero non velit corporis sunt porro culpa quam illo 
            voluptatibus voluptates perspiciatis explicabo neque 
            eius! Hic dolore ad totam modi vero neque, nesciunt 
            placeat voluptatum amet tempora natus. Rerum natus, ea 
            aut reprehenderit aspernatur sunt hic nulla sint ipsam 
            esse, laudantium obcaecati reiciendis repellat fuga qui 
            velit quis eaque. Deleniti id adipisci accusamus 
            asperiores veniam optio fugit corporis hic harum 
            laboriosam! Reiciendis neque vero incidunt suscipit 
            aliquid iusto corrupti ipsum pariatur.
          </div>
        </div>
      </div>
      
    </div>
    <div className={classes.stickyBoxContainer}>
      <div className={classes.stickyBox}>
        <div className={classes.courseText}>Course</div>
        <div className={classes.serviceDesignText}>Service Design Essentials</div>
        <span className={classes.detailText}>
      Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Voluptatem
        </span>
        <div className={classes.price}>Price (THB x,xxx.xx)</div>
        <hr className={classes.underline}/>
        <button className={classes.buttonGetInDesireCourse}>Get in Desire Course</button>
        <button className={classes.buttonSubscribeThisCourse}>Subscribe This Course</button>
      </div>
    </div></div>
  );
}

export default CourseDetail;