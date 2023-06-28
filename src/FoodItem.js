import React from "react";
import {  Navigate, useParams } from "react-router-dom";
import { redirect,useNavigate,useLocation } from "react-router-dom"
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

function Item({ items, cantFind }) {
  const navigate = useNavigate()
  const test = useLocation()
  const { id } = useParams();
  console.log(test)
  // item === snack ? item = items.find(snack => snack.id === id): ''
  // item === drink ? item = items.find(drink => drink.id === id): ''
   const path = test.pathname.split('/')[1]
   console.log(path)
  let item = items.find(i => i.id === id);
  if (!item) return navigate(`/${path}`)
  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {item.name}
          </CardTitle>
          <CardText className="font-italic">{item.description}</CardText>
          <p>
            <b>Recipe:</b> {item.recipe}
          </p>
          <p>
            <b>Serve:</b> {item.serve}
          </p>
        </CardBody>
      </Card>
    </section>
  );
}

export default Item;
