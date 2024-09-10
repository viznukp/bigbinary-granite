import React, { useState, useEffect } from "react";

import tasksApi from "apis/tasks";
import usersApi from "apis/users";
import { Container, PageLoader, PageTitle } from "components/commons";

import Form from "./Form";

const Create = ({ history }) => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await tasksApi.create({ title, assigned_user_id: userId });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const {
        data: { users },
      } = await usersApi.fetch();
      setUsers(users);
      setUserId(users[0].id);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle title="Add new task" />
        <Form
          assignedUser={users[0]}
          handleSubmit={handleSubmit}
          loading={loading}
          setTitle={setTitle}
          setUserId={setUserId}
          title={title}
          users={users}
        />
      </div>
    </Container>
  );
};

export default Create;
