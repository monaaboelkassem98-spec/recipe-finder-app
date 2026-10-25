import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Spinner, Alert } from 'react-bootstrap';
import { FaSearch, FaTimes } from 'react-icons/fa';
import RecipeCard from '../components/RecipeCard';
import { getAllRecipes, searchRecipes, getAllTags, getRecipesByTag } from '../services/api';

const Home = ({ favorites, onToggleFavorite }) => {
  const [recipes, setRecipes] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial data
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [recipesData, tagsData] = await Promise.all([getAllRecipes(), getAllTags()]);
      setRecipes(recipesData.recipes || []);
      setTags(tagsData || []);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    try {
      setLoading(true);
      setError(null);
      setSelectedTag('');
      const data = await searchRecipes(searchTerm);
      setRecipes(data.recipes || []);
    } catch (err) {
      setError('Error searching recipes.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    fetchInitialData();
  };

  // Handle Filter by Tag
  const handleTagFilter = async (tag) => {
    setSelectedTag(tag);
    setSearchTerm('');
    if (!tag) {
      fetchInitialData();
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const data = await getRecipesByTag(tag);
      setRecipes(data.recipes || []);
    } catch (err) {
      setError('Error filtering recipes.');
    } finally {
      setLoading(false);
    }
  };

  // Sorting Logic (Bonus)
  const sortedRecipes = [...recipes].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'prepTime') return a.prepTimeMinutes - b.prepTimeMinutes;
    return 0;
  });

  return (
    <Container className="py-4">
      {/* Search and Filters Section */}
      <Row className="g-3 mb-4">
        <Col md={6}>
          <Form onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button variant="outline-secondary" onClick={handleClearSearch}>
                  <FaTimes />
                </Button>
              )}
              <Button type="submit" variant="dark">
                <FaSearch /> Search
              </Button>
            </InputGroup>
          </Form>
        </Col>

        <Col md={3}>
          <Form.Select value={selectedTag} onChange={(e) => handleTagFilter(e.target.value)}>
            <option value="">All Tags / Filter by Tag</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md={3}>
          <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="rating">Highest Rating</option>
            <option value="prepTime">Fastest Prep Time</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Clear Active Filters */}
      {(selectedTag || searchTerm) && (
        <div className="d-flex align-items-center gap-2 mb-3">
          <span className="text-muted small">Active Filter:</span>
          {selectedTag && <span className="badge bg-secondary">{selectedTag}</span>}
          {searchTerm && <span className="badge bg-secondary">Query: {searchTerm}</span>}
          <Button
            variant="link"
            size="sm"
            className="text-danger p-0 ms-2"
            onClick={() => {
              setSelectedTag('');
              setSearchTerm('');
              fetchInitialData();
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Main Content */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="dark" />
          <p className="mt-2 text-muted">Loading delicious recipes...</p>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : sortedRecipes.length === 0 ? (
        <Alert variant="info" className="text-center">
          No recipes found matching your criteria.
        </Alert>
      ) : (
        <>
          <p className="text-muted mb-3">Showing {sortedRecipes.length} recipes</p>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {sortedRecipes.map((recipe) => (
              <Col key={recipe.id}>
                <RecipeCard
                  recipe={recipe}
                  isFavorite={favorites.some((fav) => fav.id === recipe.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default Home;