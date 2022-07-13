import { useState, useEffect } from "react";
import axios from "axios";
import { ADD_QUIZ_SCORE_API, LIST_QUIZ_SCORE_API } from "../ApiServices";

export default function useQuiz() {
  const [scoreList, setScoreList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isAddScoreLoading, setAddScoreLoading] = useState(false);
  const headers = {
    token: `${localStorage.getItem("tarn-front-token")}`,
  };

  // GET TO DO LIST
  useEffect(() => {
    if (headers.token) {
      setLoading(true);
      axios
        .get(LIST_QUIZ_SCORE_API, { headers })
        .then((res) => {
          setScoreList(res.data.scorelist);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

  // ADD TODO TO DATABASE
  const addScore = (score, _id) => {
    const data = {
      score: score,
      userId: _id,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
    };
    setAddScoreLoading(true);
    axios
      .post(ADD_QUIZ_SCORE_API, data, { headers })
      .then((res) => {
        setAddScoreLoading(false);
      })
      .catch((err) => {
        setAddScoreLoading(false);
        console.log(err);
      });
  };
  return { addScore, isAddScoreLoading, isLoading, scoreList };
}
