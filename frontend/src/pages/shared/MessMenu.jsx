function MessMenu() {
  const menu = [
    {
      day: "Monday",
      breakfast: "Idli, Sambar & Chutney",
      lunch: "Rice, Dal, Mixed Veg & Curd",
      snacks: "Tea & Biscuits",
      dinner: "Roti, Paneer Curry & Rice",
    },
    {
      day: "Tuesday",
      breakfast: "Poha, Boiled Egg & Tea",
      lunch: "Rice, Dal, Aloo Curry & Salad",
      snacks: "Samosa & Tea",
      dinner: "Roti, Chicken Curry & Rice",
    },
    {
      day: "Wednesday",
      breakfast: "Puri, Aloo Curry & Tea",
      lunch: "Rice, Dal, Fish Curry & Vegetables",
      snacks: "Bread & Tea",
      dinner: "Roti, Dal Makhani & Rice",
    },
    {
      day: "Thursday",
      breakfast: "Upma, Chutney & Tea",
      lunch: "Rice, Dal, Rajma & Salad",
      snacks: "Pakoda & Tea",
      dinner: "Roti, Mixed Veg Curry & Rice",
    },
    {
      day: "Friday",
      breakfast: "Paratha, Curd & Tea",
      lunch: "Rice, Dal, Chicken Curry & Salad",
      snacks: "Biscuits & Tea",
      dinner: "Roti, Paneer Curry & Rice",
    },
    {
      day: "Saturday",
      breakfast: "Dosa, Sambar & Chutney",
      lunch: "Rice, Dal, Veg Curry & Curd",
      snacks: "Fruit & Tea",
      dinner: "Roti, Egg Curry & Rice",
    },
    {
      day: "Sunday",
      breakfast: "Puri, Chana Curry & Tea",
      lunch: "Special Veg Biryani & Raita",
      snacks: "Cake & Juice",
      dinner: "Roti, Special Paneer Curry & Rice",
    },
  ];

  return (
    <div className="mess-page">
      <div className="panel mess-header">
        <div>
          <h2>Mess Menu</h2>
          <p>Weekly meal schedule</p>
        </div>

        <div className="mess-badge">🍱 Weekly Menu</div>
      </div>

      <div className="panel">
        <div className="mess-table">
          <div className="mess-table-header">
            <span>Day</span>
            <span>Breakfast</span>
            <span>Lunch</span>
            <span>Snacks</span>
            <span>Dinner</span>
          </div>

          {menu.map((item) => (
            <div className="mess-table-row" key={item.day}>
              <strong>{item.day}</strong>

              <span>{item.breakfast}</span>

              <span>{item.lunch}</span>

              <span>{item.snacks}</span>

              <span>{item.dinner}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MessMenu;
