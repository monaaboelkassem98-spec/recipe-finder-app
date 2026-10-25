import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar, FaClock, FaHeart, FaRegHeart } from 'react-icons/fa';

const RecipeCard = ({ recipe, isFavorite, onToggleFavorite }) => {
  return (
    <Card className="h-100 shadow-sm border-0 rounded-3 overflow-hidden recipe-card">
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={recipe.image} 
          alt={recipe.name} 
          style={{ height: '200px', objectFit: 'cover' }} 
        />
        <Button
          variant="light"
          className="position-absolute top-0 end-0 m-2 rounded-circle p-2 shadow-sm border-0"
          onClick={() => onToggleFavorite(recipe)}
        >
          {isFavorite ? <FaHeart className="text-danger" /> : <FaRegHeart className="text-secondary" />}
        </Button>
        <Badge bg="dark" className="position-absolute bottom-0 start-0 m-2 opacity-75">
          {recipe.cuisine}
        </Badge>
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold fs-5 text-truncate">{recipe.name}</Card.Title>
        
        <div className="d-flex justify-content-between align-items-center my-2 text-muted small">
          <span className="d-flex align-items-center gap-1">
            <FaStar className="text-warning" /> {recipe.rating}
          </span>
          <span className="d-flex align-items-center gap-1">
            <FaClock /> Prep: {recipe.prepTimeMinutes}m | Cook: {recipe.cookTimeMinutes}m
          </span>
        </div>

        <div className="mt-auto pt-2">
          <Button as={Link} to={`/recipe/${recipe.id}`} variant="outline-dark" className="w-100 fw-semibold">
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;