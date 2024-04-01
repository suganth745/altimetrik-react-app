import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./header";
import { useDispatch, useSelector } from "react-redux";
import {
  get_all_users_thunk,
  update_users_thunk,
} from "../redux/thunk/user-thunk";
import { FaCheck, FaPencilAlt } from "react-icons/fa";
import {
  edit_user_data,
  edit_users_request,
  save_users_request,
} from "../redux/actions/user-action";

const UserDetails = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.user);

  const { first_name, last_name } = data.data.data;

  useEffect(() => {
    data.users?.length === 0 && dispatch(get_all_users_thunk());
  }, []);

  return (
    <>
      <div className="page_wrapper profile_wrapper">
        <div className="content_wrapper">
          <div className="container-fluid">
            <div className="row vh-100">
              <div className="col-md-12 p-0">
                <Header />

                <div className="dashboard-container">
                  <div className="row">
                    <div className="col-md-12">
                      <h2 className="page_title p-5 pb-0">
                        Welcome {first_name} {last_name}
                      </h2>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 p-5">
                      <button
                        type="button"
                        className="btn btn-success mb-3"
                        onClick={() => dispatch(get_all_users_thunk())}
                      >
                        Hard Refresh
                      </button>
                      <table className="table table-bordered bg-light">
                        <thead>
                          <tr>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Preferred Payment Method</th>
                            <th>Edit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.users?.map((usr, i) => (
                            <tr>
                              <td>{usr.user_name}</td>
                              <td>
                                {usr.edit ? (
                                  <input
                                    type="text"
                                    name="first_name"
                                    value={usr.first_name}
                                    className="form-control"
                                    onChange={(e) =>
                                      dispatch(
                                        edit_user_data({
                                          id: usr._id,
                                          name: e.target.name,
                                          value: e.target.value,
                                        })
                                      )
                                    }
                                  />
                                ) : (
                                  usr.first_name
                                )}
                              </td>
                              <td>
                                {" "}
                                {usr.edit ? (
                                  <input
                                    type="text"
                                    name="last_name"
                                    value={usr.last_name}
                                    className="form-control"
                                    onChange={(e) =>
                                      dispatch(
                                        edit_user_data({
                                          id: usr._id,
                                          name: e.target.name,
                                          value: e.target.value,
                                        })
                                      )
                                    }
                                  />
                                ) : (
                                  usr.last_name
                                )}
                              </td>
                              <td>
                                {" "}
                                {usr.edit ? (
                                  <input
                                    type="text"
                                    name="address"
                                    value={usr.address}
                                    className="form-control"
                                    onChange={(e) =>
                                      dispatch(
                                        edit_user_data({
                                          id: usr._id,
                                          name: e.target.name,
                                          value: e.target.value,
                                        })
                                      )
                                    }
                                  />
                                ) : (
                                  usr.address
                                )}
                              </td>
                              <td>
                                {usr.edit ? (
                                  <input
                                    type="text"
                                    name="preferred_payment_method"
                                    value={usr.preferred_payment_method}
                                    className="form-control"
                                    onChange={(e) =>
                                      dispatch(
                                        edit_user_data({
                                          id: usr._id,
                                          name: e.target.name,
                                          value: e.target.value,
                                        })
                                      )
                                    }
                                  />
                                ) : (
                                  usr.preferred_payment_method
                                )}
                              </td>
                              <td>
                                {usr.edit ? (
                                  <FaCheck
                                    role="button"
                                    onClick={() =>
                                      dispatch(update_users_thunk(usr._id, usr))
                                    }
                                  />
                                ) : (
                                  <FaPencilAlt
                                    role="button"
                                    onClick={() =>
                                      dispatch(edit_users_request(usr._id))
                                    }
                                  />
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
