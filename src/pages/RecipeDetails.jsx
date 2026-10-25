import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { FaStar, FaClock, FaUtensils, FaUserFriends, FaHeart, FaRegHeart, FaArrowLeft, FaCheckCircle, FaListUl } from 'react-icons/fa';
import { getSingleRecipe } from '../services/api';

const RecipeDetails = ({ favorites, onToggleFavorite }) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const data = await getSingleRecipe(id);
        setRecipe(data);
      } catch (err) {
        setError('Failed to load recipe details.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="dark" />
      </Container>
    );
  }

  if (error || !recipe) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">{error || 'Recipe not found.'}</Alert>
      </Container>
    );
  }

  const isFavorite = favorites.some((fav) => fav.id === recipe.id);

  return (
    <Container className="py-4">
      <Button as={Link} to="/" variant="outline-dark" className="mb-4 d-inline-flex align-items-center gap-2 rounded-pill px-3">
        <FaArrowLeft /> Back to Recipes
      </Button>

      <Card className="shadow-sm border-0 rounded-4 overflow-hidden mb-5">
        <Row className="g-0">
          <Col md={5}>
            <Card.Img src={recipe.image} alt={recipe.name} style={{ height: '100%', minHeight: '380px', objectFit: 'cover' }} />
          </Col>
          <Col md={7}>
            <Card.Body className="p-4 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h2 className="fw-bold mb-2 text-dark">{recipe.name}</h2>
                    <div className="d-flex gap-2 mb-3 flex-wrap">
                      <Badge bg="dark" className="px-3 py-2">{recipe.cuisine}</Badge>
                      <Badge bg="secondary" className="px-3 py-2">{recipe.difficulty}</Badge>
                      {recipe.tags?.map((tag) => (
                        <Badge bg="light" text="dark" key={tag} className="border px-3 py-2">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant={isFavorite ? 'danger' : 'outline-danger'}
                    onClick={() => onToggleFavorite(recipe)}
                    className="d-flex align-items-center gap-2 rounded-pill px-3"
                  >
                    {isFavorite ? <FaHeart /> : <FaRegHeart />}
                    {isFavorite ? 'Saved' : 'Save'}
                  </Button>
                </div>

                <Row className="py-3 border-top border-bottom text-center my-3 g-2 bg-light rounded-3">
                  <Col xs={3}>
                    <FaStar className="text-warning fs-5" />
                    <div className="fw-bold mt-1">{recipe.rating}</div>
                    <small className="text-muted">Reviews</small>
                  </Col>
                  <Col xs={3}>
                    <FaClock className="text-primary fs-5" />
                    <div className="fw-bold mt-1">{recipe.prepTimeMinutes}m</div>
                    <small className="text-muted">Prep</small>
                  </Col>
                  <Col xs={3}>
                    <FaUtensils className="text-danger fs-5" />
                    <div className="fw-bold mt-1">{recipe.cookTimeMinutes}m</div>
                    <small className="text-muted">Cook</small>
                  </Col>
                  <Col xs={3}>
                    <FaUserFriends className="text-success fs-5" />
                    <div className="fw-bold mt-1">{recipe.servings}</div>
                    <small className="text-muted">Servings</small>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Col>
        </Row>

        <Card.Footer className="bg-white p-4 border-top">
          <Row className="g-4">
            <Col lg={5}>
              <div className="p-4 bg-light rounded-4 h-100 border">
                <h4 className="fw-bold mb-3 text-dark d-flex align-items-center gap-2">
                  <FaListUl className="text-primary" /> Ingredients
                </h4>
                <ul className="list-unstyled mb-0">
                  {recipe.ingredients?.map((item, index) => (
                    <li key={index} className="py-2 border-bottom border-light d-flex align-items-center gap-2 text-secondary">
                      <span className="badge bg-primary rounded-circle p-1" style={{ width: '8px', height: '8px' }}></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Col>

            <Col lg={7}>
              <div className="p-4 bg-light rounded-4 h-100 border">
                <h4 className="fw-bold mb-3 text-dark d-flex align-items-center gap-2">
                  <FaCheckCircle className="text-success" /> Cooking Instructions
                </h4>
                <div className="d-flex flex-column gap-3">
                  {recipe.instructions?.map((step, index) => (
                    <div key={index} className="d-flex gap-3 align-items-start bg-white p-3 rounded-3 shadow-sm">
                      <span className="badge bg-dark rounded-pill px-2 py-1 fs-6">{index + 1}</span>
                      <p className="mb-0 text-secondary" style={{ lineHeight: '1.6' }}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default RecipeDetails;