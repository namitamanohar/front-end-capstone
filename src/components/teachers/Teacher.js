
import React, { useState } from "react"
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TeacherDetailsList from "./TeacherDetailsList";

export default ({teacher, className}) => {


  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return(


<Row>
      {/* <Col> */}
        <Card className="teachers" body>
          <CardTitle>{teacher.prefix.name}.{teacher.lastName}</CardTitle>
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