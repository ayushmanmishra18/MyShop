import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Checkbox,
  TextField,
  InputAdornment,
  Collapse,
  IconButton
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon, 
  ExpandLess as ExpandLessIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const CategoryFilter = ({ selectedCategory, onChange }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState(true);
  
  // Get categories from Redux
  const categories = useSelector((state) => state.search.filters.categories || []);
  
  // Filter categories based on search term
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Toggle category expansion
  const handleToggle = () => {
    setExpanded(!expanded);
  };
  
  // Handle category selection
  const handleCategoryClick = (categoryId) => {
    onChange(categoryId === selectedCategory ? null : categoryId);
  };
  
  return (
    <Box className="bg-white rounded-lg shadow-sm p-4">
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={2}
        onClick={handleToggle}
        sx={{ cursor: 'pointer' }}
      >
        <Typography variant="subtitle1" className="font-medium">
          Categories
        </Typography>
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Box>
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        <List dense disablePadding>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <ListItem 
                key={category._id} 
                disablePadding 
                disableGutters
                sx={{
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemButton 
                  dense 
                  onClick={() => handleCategoryClick(category._id)}
                  sx={{ py: 0.5, px: 1 }}
                >
                  <Checkbox
                    edge="start"
                    checked={selectedCategory === category._id}
                    tabIndex={-1}
                    disableRipple
                    size="small"
                    sx={{ p: 0.5, mr: 1 }}
                  />
                  <ListItemText 
                    primary={category.name} 
                    primaryTypographyProps={{
                      variant: 'body2',
                      color: selectedCategory === category._id ? 'primary' : 'textPrimary',
                      fontWeight: selectedCategory === category._id ? 'medium' : 'regular',
                    }}
                  />
                  <Typography variant="caption" color="textSecondary">
                    ({category.count || 0})
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary" sx={{ pl: 2, py: 1 }}>
              No categories found
            </Typography>
          )}
        </List>
        
        {selectedCategory && (
          <Box mt={1} textAlign="right">
            <Typography 
              variant="caption" 
              color="primary"
              onClick={() => onChange(null)}
              sx={{ 
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' } 
              }}
            >
              Clear filter
            </Typography>
          </Box>
        )}
      </Collapse>
    </Box>
  );
};

export default CategoryFilter;
