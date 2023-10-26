export const checkActivity = () => {
  let list = document.getElementById("orderDishes");
  if (list) {
    let inputs = list.getElementsByTagName("input");
    let isChecked = true;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox") {
        isChecked = inputs[i].checked;
        if (!isChecked) break;
      }
    }
    return isChecked;
  }
  return false;
};
