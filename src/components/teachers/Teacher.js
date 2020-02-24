// student view 
import React, { useState } from "react"
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TeacherDetailsList from "./TeacherDetailsList";
import "./Teachers.css"

export default ({teacher, className}) => {


  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return(
// display teacher as a card with a See More button that onlick shows the TeacherDetailList compoment as the modalBody and sends the teacher object to that compoenent

<Row>
        <Card className="teachers" body>
          <CardTitle className="teacherAndLogo">
          <img className="appleLogo" src={require ("../images/apple.svg")}/> 
            <div className="teacherName">{teacher.prefix.name}.{teacher.lastName}</div>
          </CardTitle>
          <CardText>{teacher.subject.name}</CardText>
          <Button  color="secondary" onClick={toggle}>See More </Button>
          <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>{teacher.prefix.name}.{teacher.lastName}'s Announcements</ModalHeader>
                        <ModalBody>
                          <TeacherDetailsList teacher={ teacher } />
                        </ModalBody>
                      <ModalFooter>
                    </ModalFooter>
                  </Modal> 
        </Card>
     
    </Row>
)

}