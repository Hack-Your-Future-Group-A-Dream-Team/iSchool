import React from 'react'
import './Info.css'
import Education from './assets/education.jpg';
import Network from './assets/networks.jpg';
import Secondary from './assets/secondary.jpg';
import Reception from './assets/Reception.jpg'

function Info() {
    return ( 
        <div className="full-page">
            <div className="edu-bel">
               
             <div className="part1">
             <h3>Education in Belgium</h3>
                <p className="text1">
                    In Belgium freedom of education is a constitutional right. Every (legal) person may 
                    organise education and establish schools to that aim. The government has the duty to 
                    organise undenominational education.
                </p>
                <p className="text2">
                    The constitution also guarantees a freedom of school choice for the parents. 
                    Parents and children must have access to a school of their choice within reasonable 
                    distance of their residence.
                </p>
                <p className="text3">
                    While some aspects may differ, the compulsory school age throughout Belgium is between 
                    six and 18. Compulsory education is divided into primary (6-12 years) and secondary 
                    (12-18 years). Before the compulsory school age, there are also free pre-primary school 
                    facilities for children aged 2,5 years and over.
                </p>
                </div>
                <div className="image1">
                   <img src={Education} alt="Education" className="img1"/>  
                </div>
                
            </div>
            <div className="edu-net">
            <div className="apart">
                <div className="image2">
                   <img src={Network} alt="Education network" className="img2"/>
                </div>
            <div className="part2">
                
                    <h3>Educational Networks</h3>
                        <p className="text1">
                            Education is organised in various networks.
                            Education and training organised by the government is called official education 
                            (officieel onderwijs) - education and training organised by a private person or 
                            organisation is known as free education (vrij onderwijs) (Government-aided private 
                            education).A small number of schools are not recognised by the government. These private
                            schools do not receive funding from the government.
                        </p>
                </div>
                </div>
                
                  <p className="text2"><span>In Flanders there are three educational networks: </span></p>
                  <div className="boxList">
                            <div>
                                GO! Education is the official education organised by the Flemish Community. 
                                The constitution prescribes a duty of neutrality for GO! Education.
                            </div>
                            <div>
                                Government-aided public education comprises schools run by the municipal or 
                                provincial authorities.
                            </div>
                            <div>
                                Government-aided private education is organised by a private person or 
                                organisation. The network consists primarily of catholic schools. Next to 
                                denominational schools it includes schools not linked to a religion, e.g. 
                                alternative schools (on the basis of the ideas of Freinet, Montessori or 
                                Steiner) which apply specific teaching methods.
                            </div>
                        
                        </div>
           
                
                   
            </div>
            <div className="pub-sec-bel">
                <div className="part">

                    <div className="part3">
                        <h3>Public secondary schools in Belgium</h3>
                        <p className="text1">
                        States schools are free to all pupils, although they may require a contribution for 
                        textbook costs. Full time secondary education contains three stages and various types 
                        of education. Each stage consists of two grades. In the third stage of vocational secondary 
                        education the successful completion of a third grade is necessary in order to obtain the 
                        certificate of secondary education. In the first stage of secondary education a common 
                        curriculum is offered. Pupils make a choice of study only at the start of the second stage.
                         From the second stage onwards four different types of education are offered. 
    
                        </p>
                    </div>
                    <div className="image3">
                        <img src={Secondary} alt="Education network" className="img3"/>
                    </div>
            </div>
               <p className="text2"> 
               In Flanders a pupil chooses a course of study within one of the following types of education:
                 </p>
                 <div className="box">
                        <p className="text3">
                            <span>General secondary education(gse),</span> which focuses on broad general 
                            education. It does not prepare pupils for a specific profession, but rather lays a 
                            firm foundation for higher education.
                        </p>
                        <p className="text4">
                            <span>In technical secondary education (tse),</span> attention goes in particular 
                            to general and technical-theoretical subjects. After tse a youngster may practice a
                            profession or transfer to higher education. This type of education also contains 
                            practical training.
                        </p>
                        <p className="text5">
                            <span>Secondary education in the arts,</span> combines a broad general education 
                            with an active practice of art. After secondary education in the arts a youngster 
                            may practice a profession or transfer to higher education.
                        </p>
                        <p className="text6">
                            <span> Vocational secondary education(vse),</span> is a practically-oriented type of
                            education in which the youngster receives general education but where the focus 
                            primarily lies on learning a specific profession.
                        </p>
                </div>
                
            </div>

            <div className="lan-edu">
                   <div className="image4">
                        <img src={Reception} alt="Education network" className="img4"/>
                    </div>
                    <div className="part4">
                    <h3>Reception/Language Education</h3>
                        <p className="text1">
                            The language of education in Dutch-speaking region is only Dutch. Therefore every 
                            student is expected to know enough level of Dutch language in order to follow the 
                            lessons. For this purposes some of the schools organizes reception classes which are
                            called as OKAN ( Onthal Klassen Anderstalige Nieuwkomers; Reception Classes For 
                            Foreign-speaking Newcomers). Reception education for foreign-speaking newcomers 
                            takes care of foreign-language pupils, who have recently arrived in Belgium, in 
                            order to teach them Dutch as quickly as possible and to integrate them in the form 
                            of education and course of study that most closely match the individual capacities 
                            of this foreign-speaking newcomer. Reception education for foreign-speaking newcomers
                            makes it possible for the pupils involved to successfully continue their learning
                            career in mainstream secondary education or, if necessary, more broadly, in further 
                            education.
                        </p>
                    </div>
                
            </div>
        </div>
    )

}

export default Info