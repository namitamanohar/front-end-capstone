
import React from "react"
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';


export default ({teacher}) => {

  return(
    // <section className="teacher">
    //     <h4 className="teacher__name"></h4>
    //     <p className="teacher__subject"></p>

    // </section>



<Row>
      {/* <Col> */}
        <Card className="teachers" body>
          <CardTitle>{teacher.prefix.name}.{teacher.lastName}</CardTitle>
          <CardText>{teacher.subject.name}</CardText>
          <Button>See More</Button>
        </Card>
      {/* </Col> */}
    </Row>
)

}