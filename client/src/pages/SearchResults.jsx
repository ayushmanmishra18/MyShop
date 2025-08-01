            On Sale
          </Button>
        </Box>
      </Box>
    </Box>
  );
  
  // Render mobile filters button
  const renderMobileFiltersButton = () => (
    <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
      <Button
        variant="outlined"
        startIcon={<TuneIcon />}
        onClick={() => setMobileFiltersOpen(true)}
        fullWidth
      >
        Filters {hasActiveFilters() && `(${Object.keys(filters).filter(k => filters[k] && k !== 'sortBy').length})`}
      </Button>
    </Box>
  );
  
  // Render mobile filters drawer
  const renderMobileFilters = () => (
    <Drawer
      anchor="right"
      open={mobileFiltersOpen}
      onClose={() => setMobileFiltersOpen(false)}
      sx={{ '& .MuiDrawer-paper': { width: '85%', maxWidth: 350, p: 2 } }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Filters</Typography>
        <IconButton onClick={() => setMobileFiltersOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Box mb={3}>
        <PriceRangeFilter />
      </Box>
      
      <Box mb={3}>
        <CategoryFilter 
          selectedCategory={filters.category} 
          onChange={(category) => {
            handleFilterChange({ category });
            setMobileFiltersOpen(false);
          }}
        />
      </Box>
      
      <Box mb={3}>
        <RatingFilter 
          value={filters.rating} 
          onChange={(rating) => {
            handleFilterChange({ rating });
            setMobileFiltersOpen(false);
          }}
        />
      </Box>
      
      <Box mb={3}>
        <Button
          fullWidth
          variant={filters.inStockOnly ? 'contained' : 'outlined'}
          color={filters.inStockOnly ? 'primary' : 'inherit'}
          onClick={() => {
            handleFilterChange({ inStockOnly: !filters.inStockOnly });
            setMobileFiltersOpen(false);
          }}
          sx={{ mb: 1, justifyContent: 'flex-start' }}
        >
          In Stock Only
        </Button>
        
        <Button
          fullWidth
          variant={filters.onSaleOnly ? 'contained' : 'outlined'}
          color={filters.onSaleOnly ? 'primary' : 'inherit'}
          onClick={() => {
            handleFilterChange({ onSaleOnly: !filters.onSaleOnly });
            setMobileFiltersOpen(false);
          }}
          sx={{ justifyContent: 'flex-start' }}
        >
          On Sale
        </Button>
      </Box>
      
      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button 
          variant="outlined" 
          onClick={handleResetFilters}
          disabled={!hasActiveFilters()}
          fullWidth
          sx={{ mr: 1 }}
        >
          Reset All
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setMobileFiltersOpen(false)}
          fullWidth
          sx={{ ml: 1 }}
        >
          Apply Filters
        </Button>
      </Box>
    </Drawer>
  );
  
  // Render active filters
  const renderActiveFilters = () => {
    if (!hasActiveFilters()) return null;
    
    return (
      <Box mb={3}>
        <Box display="flex" flexWrap="wrap" alignItems="center" mb={1}>
          <Typography variant="subtitle2" sx={{ mr: 1 }}>Active filters:</Typography>
          
          {filters.minPrice > filters.priceRange.min && (
            <ActiveFilterChip
              label={`Min: $${filters.minPrice}`}
              onDelete={() => handleFilterChange({ minPrice: filters.priceRange.min })}
              size="small"
            />
          )}
          
          {filters.maxPrice < filters.priceRange.max && (
            <ActiveFilterChip
              label={`Max: $${filters.maxPrice}`}
              onDelete={() => handleFilterChange({ maxPrice: filters.priceRange.max })}
              size="small"
            />
          )}
          
          {filters.category && (
            <ActiveFilterChip
              label={`Category: ${filters.category}`}
              onDelete={() => handleFilterChange({ category: null })}
              size="small"
            />
          )}
          
          {filters.rating && (
            <ActiveFilterChip
              label={`Rating: ${filters.rating}+`}
              onDelete={() => handleFilterChange({ rating: null })}
              size="small"
            />
          )}
          
          {filters.inStockOnly && (
            <ActiveFilterChip
              label="In Stock"
              onDelete={() => handleFilterChange({ inStockOnly: false })}
              size="small"
            />
          )}
          
          {filters.onSaleOnly && (
            <ActiveFilterChip
              label="On Sale"
              onDelete={() => handleFilterChange({ onSaleOnly: false })}
              size="small"
            />
          )}
          
          <Button 
            size="small" 
            onClick={handleResetFilters}
            sx={{ ml: 1 }}
          >
            Clear all
          </Button>
        </Box>
      </Box>
    );
  };
  
  // Render sort options
  const renderSortOptions = () => (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
      <Typography variant="body2" color="textSecondary">
        {totalResults} {totalResults === 1 ? 'result' : 'results'}
        {query && ` for "${query}"`}
      </Typography>
      
      <Box display="flex" alignItems="center">
        <Typography variant="body2" color="textSecondary" sx={{ mr: 1 }}>
          Sort by:
        </Typography>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <Select
            value={filters.sortBy || 'featured'}
            onChange={handleSortChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Sort products' }}
          >
            <MenuItem value="featured">Featured</MenuItem>
            <MenuItem value="price-asc">Price: Low to High</MenuItem>
            <MenuItem value="price-desc">Price: High to Low</MenuItem>
            <MenuItem value="newest">Newest Arrivals</MenuItem>
            <MenuItem value="rating">Highest Rated</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
  
  // Render pagination
  const renderPagination = () => (
    <Box display="flex" justifyContent="center" mt={4} mb={6}>
      <Box display="flex" alignItems="center">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outlined"
          sx={{ minWidth: 40, height: 40, mr: 1 }}
        >
          &lt;
        </Button>
        
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          // Show first, last and pages around current page
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }
          
          return (
            <Button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              variant={currentPage === pageNum ? 'contained' : 'outlined'}
              color={currentPage === pageNum ? 'primary' : 'inherit'}
              sx={{ 
                minWidth: 40, 
                height: 40, 
                mx: 0.5,
                fontWeight: currentPage === pageNum ? 'bold' : 'normal'
              }}
            >
              {pageNum}
            </Button>
          );
        })}
        
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outlined"
          sx={{ minWidth: 40, height: 40, ml: 1 }}
        >
          &gt;
        </Button>
        
        <Box ml={2} display="flex" alignItems="center">
          <Typography variant="body2" color="textSecondary" sx={{ mr: 1 }}>
            Items per page:
          </Typography>
          <Select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            size="small"
            sx={{ minWidth: 80 }}
          >
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={24}>24</MenuItem>
            <MenuItem value={48}>48</MenuItem>
          </Select>
        </Box>
      </Box>
    </Box>
  );
  
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {query ? `Search Results for "${query}"` : 'All Products'}
        </Typography>
        
        {/* Search bar for mobile */}
        <Box mb={3} sx={{ display: { xs: 'block', md: 'none' } }}>
          <SearchBar isMobile />
        </Box>
        
        {/* Active filters and sort */}
        <Box mb={3}>
          {renderActiveFilters()}
          {renderSortOptions()}
        </Box>
        
        {/* Main content */}
        <Grid container spacing={3}>
          {/* Filters sidebar */}
          <Grid item xs={12} md={3}>
            {renderMobileFiltersButton()}
            {renderDesktopFilters()}
          </Grid>
          
          {/* Products grid */}
          <Grid item xs={12} md={9}>
            {loading && products.length > 0 && (
              <Box display="flex" justifyContent="center" my={2}>
                <CircularProgress size={24} />
              </Box>
            )}
            
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} lg={4} key={product._id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
            
            {products.length > 0 && renderPagination()}
          </Grid>
        </Grid>
      </Box>
      
      {/* Mobile filters drawer */}
      {renderMobileFilters()}
    </Container>
  );
};

export default SearchResults;
