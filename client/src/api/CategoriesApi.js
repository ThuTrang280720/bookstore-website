import { useState, useEffect } from "react";
import axios from "axios";

export default function CategoriesApi() {
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);

  const getCategories = async () => {
    const res = await axios.get("/api/category");
    setCategories(res.data);
  };

  useEffect(() => {
    getCategories();
  }, [callback]);
  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback],
  };
}
