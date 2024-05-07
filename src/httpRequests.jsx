const URL = "http://localhost:3000/api/employees";
const errorMessage = {
  error: true,
};

export const setInitialEmployee = async () => {
  try {
    const res = await fetch(URL);
    if (!res.ok) {
      // throw new Error("Network response was not ok");
      return { ...errorMessage, message: "Network response was not ok" };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return { ...errorMessage, message: error };
    // return error;
  }
};

export const deleteAllChecked = async (selectedEmployees) => {
  try {
    const endPoint = URL + "/delete";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedEmployees),
    };

    const res = await fetch(endPoint, requestOptions);
    if (!res.ok) {
      return "Network response was not ok";
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteEmployee = async (eid) => {
  try {
    const endPoint = URL + "/delete/" + encodeURIComponent(eid);
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(endPoint, requestOptions);
    if (!res.ok) {
      return { ...errorMessage, message: "Network response was not ok" };
    }
    const data = await res.json();
    if (!res.ok) {
      return "Network response was not ok";
    }
    return data;
  } catch (error) {
    return error;
  }
};

export const saveUpdateEmployee = async (empId, formJson) => {
  try {
    const endPoint = URL + "/update/" + encodeURIComponent(empId);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formJson),
    };

    const res = await fetch(endPoint, requestOptions);
    if (!res.ok) {
      return { ...errorMessage, message: "Network response was not ok" };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const saveAddEmployee = async (formJson) => {
  try {
    const endpoint = URL + "/add";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formJson),
    };

    const res = await fetch(endpoint, requestOptions);
    if (!res.ok) {
      return { ...errorMessage, message: "Network response was not ok" };
    }
    // const data = await res.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const getEmployee = async (empId) => {
  try {
    const endpoint = URL + "/" + encodeURIComponent(empId);
    const res = await fetch(endpoint);
    if (!res.ok) {
      return { ...errorMessage, message: "Network response was not ok" };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
