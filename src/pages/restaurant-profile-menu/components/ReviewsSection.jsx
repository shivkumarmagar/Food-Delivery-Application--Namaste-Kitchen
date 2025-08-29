import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ReviewsSection = ({ restaurant, reviews }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');
  const [showPhotosOnly, setShowPhotosOnly] = useState(false);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Rating' },
    { value: 'lowest', label: 'Lowest Rating' },
    { value: 'helpful', label: 'Most Helpful' }
  ];

  const ratingOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  const filteredAndSortedReviews = reviews?.filter(review => {
      if (filterRating !== 'all' && review?.rating !== parseInt(filterRating)) {
        return false;
      }
      if (showPhotosOnly && (!review?.photos || review?.photos?.length === 0)) {
        return false;
      }
      return true;
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'highest':
          return b?.rating - a?.rating;
        case 'lowest':
          return a?.rating - b?.rating;
        case 'helpful':
          return b?.helpfulCount - a?.helpfulCount;
        default:
          return 0;
      }
    });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={`${
          index < rating 
            ? 'text-accent fill-current' :'text-muted-foreground'
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Rating Summary */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <span className="text-4xl font-heading font-bold text-foreground">
                {restaurant?.rating}
              </span>
              <div className="flex space-x-1">
                {renderStars(Math.floor(restaurant?.rating))}
              </div>
            </div>
            
            <p className="text-muted-foreground font-body">
              Based on {restaurant?.reviewCount} reviews
            </p>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1]?.map((stars) => {
              const count = reviews?.filter(r => r?.rating === stars)?.length;
              const percentage = reviews?.length > 0 ? (count / reviews?.length) * 100 : 0;
              
              return (
                <div key={stars} className="flex items-center space-x-3">
                  <span className="text-sm font-body text-muted-foreground w-8">
                    {stars}★
                  </span>
                  
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-smooth"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  
                  <span className="text-sm font-caption text-muted-foreground w-8">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4 mb-6 shadow-card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Sort by"
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
          />
          
          <Select
            label="Filter by rating"
            options={ratingOptions}
            value={filterRating}
            onChange={setFilterRating}
          />
          
          <div className="flex items-end">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showPhotosOnly}
                onChange={(e) => setShowPhotosOnly(e?.target?.checked)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm font-body text-foreground">
                Photos only
              </span>
            </label>
          </div>
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {filteredAndSortedReviews?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground font-body">
              No reviews match your current filters.
            </p>
          </div>
        ) : (
          filteredAndSortedReviews?.map((review) => (
            <div key={review?.id} className="bg-card border border-border rounded-lg p-6 shadow-card">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Image
                    src={review?.userAvatar}
                    alt={review?.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  
                  <div>
                    <h4 className="font-body font-semibold text-foreground">
                      {review?.userName}
                    </h4>
                    <p className="text-sm text-muted-foreground font-caption">
                      {formatDate(review?.date)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {renderStars(review?.rating)}
                </div>
              </div>

              {/* Review Content */}
              <p className="text-foreground font-body mb-4 leading-relaxed">
                {review?.comment}
              </p>

              {/* Review Photos */}
              {review?.photos && review?.photos?.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                  {review?.photos?.map((photo, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-md">
                      <Image
                        src={photo}
                        alt={`Review photo ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-smooth cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Review Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-smooth">
                    <Icon name="ThumbsUp" size={16} />
                    <span className="text-sm font-caption">
                      Helpful ({review?.helpfulCount})
                    </span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-smooth">
                    <Icon name="Flag" size={16} />
                    <span className="text-sm font-caption">Report</span>
                  </button>
                </div>

                {review?.orderItems && (
                  <div className="text-sm text-muted-foreground font-caption">
                    Ordered: {review?.orderItems?.join(', ')}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {/* Load More */}
      {filteredAndSortedReviews?.length > 0 && (
        <div className="text-center mt-8">
          <Button variant="outline">
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;