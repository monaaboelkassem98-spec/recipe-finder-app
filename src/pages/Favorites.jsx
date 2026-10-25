import React from 'react';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';

const Favorites = ({ favorites, onToggleFavorite }) => {
  return (
    <Container className="py-4">
      <h2 className="fw-bold mb-4">Your Favorite Recipes</h2>

      {favorites.length === 0 ? (
        <Alert variant="light" className="text-center py-5 border shadow-sm">
          <h4>No favorites saved yet!</h4>
          <p className="text-muted">Explore recipes and click the heart icon to save them here.</p>
          <Button as={Link} to="/" variant="dark">
            Explore Recipes
          </Button>
        </Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {favorites.map((recipe) => (
            <Col key={recipe.id}>
              <RecipeCard recipe={recipe} isFavorite={true} onToggleFavorite={onToggleFavorite} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Favorites;