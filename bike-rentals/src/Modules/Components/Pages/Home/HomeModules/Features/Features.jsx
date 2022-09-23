const Features = () => {
    const featuresList = ["Cheaper Rates", "New Bikes", "Delivery on door"];
  
    return (
      <div className="flex-box feature-parent">
        <div className="AppShadow features-box">
          <h1>{featuresList[0]}</h1>
        </div>
        <div className="AppShadow features-box">
          <h1>{featuresList[1]}</h1>
        </div>
        <div className="AppShadow features-box">
          <h1>{featuresList[2]}</h1>
        </div>
        <div className="AppShadow features-box">
          <h1>{featuresList[2]}</h1>
        </div>
      </div>
    );
  };
  export default Features;
  