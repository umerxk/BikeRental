import { AppCards } from "../../../../../shared";

const BikeCards = ({
  index,
  bike,
  cardsView = false,
  handleAction,
  userRole,
  actionText,
  actionIcon,
  disableReview = false,
  rating,
  myRating = false
}) => {
  return (
    <AppCards
      title={bike.model}
      description={bike.location}
      color={bike.color}
      handleAction={(e) => handleAction(e, bike)}
      userRole={userRole}
      handleReview={(e) => console.log(e)}
      reviewValue={myRating ? rating : bike.rating}
      disableReview={disableReview}
      newView={cardsView}
      actionText={actionText}
      actionIcon={actionIcon}
      key={index}
    />
  );
};
export default BikeCards;
