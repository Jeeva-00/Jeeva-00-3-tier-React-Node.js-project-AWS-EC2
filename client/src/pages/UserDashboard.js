import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "../axios";
import UserForm from "../components/UserForm";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { DataGrid } from "@mui/x-data-grid";

function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const formRef = useRef(null);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchUsers();
    }
  }, [user, navigate]);

  const fetchUsers = () => {
    axios
      .get("/users") // ✅ Fixed
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error("Fetch Error:", err);
        if (err.response?.status === 401) logout();
      });
  };

  const handleCreate = (userData) => {
    axios
      .post("/users", userData) // ✅ Fixed
      .then(() => {
        fetchUsers();
        setEditingUser(null);
      })
      .catch((err) => console.error("Create Error:", err));
  };

  const handleUpdate = (id, userData) => {
    if (user?.role !== "admin") return;
    axios
      .put(`/users/${id}`, userData) // ✅ Fixed
      .then(() => {
        fetchUsers();
        setEditingUser(null);
      })
      .catch((err) => console.error("Update Error:", err));
  };

  const handleDelete = (id) => {
    if (user?.role !== "admin") return;
    axios
      .delete(`/users/${id}`) // ✅ Fixed
      .then(fetchUsers)
      .catch((err) => console.error("Delete Error:", err));
  };

  const handleEditClick = (selectedUser) => {
    if (user?.role === "admin") {
      setEditingUser(selectedUser);
    }
  };

  // Prepare DataGrid columns and rows
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 180 },
    { field: "email", headerName: "Email", width: 220 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) =>
        user?.role === "admin" ? (
          <>
            <Button
              size="small"
              variant="outlined"
              sx={{ mr: 1  , background: "linear-gradient(90deg, #7c3aed 0%, #6366f1 100%)", color: "white" }}
              onClick={() => handleEditClick(params.row)}
            >
              Edit
            </Button>
            <Button
              size="small"
              variant="outlined"
              sx={{ background: "linear-gradient(90deg, #f44336 0%, #e57373 100%)", color: "white" }}
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Button>
          </>
        ) : (
          "N/A"
        ),
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          'url("https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3BnMzU0MmthcmhlajNpaWVscmI3eHkxeGV6YmtwaXN1dmw4bTg2YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2vmiW6mcYgKst3QVDK/giphy.gif")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar
        position="static"
        sx={{ background: "linear-gradient(90deg, #7c3aed 0%, #6366f1 100%)" }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <AccountCircleIcon
              sx={{
                fontSize: 38,
                bgcolor: "white",
                color: "#7c3aed",
                borderRadius: "50%",
                p: 0.5,
                boxShadow: 2,
                background: "white",
                mr: 1,
              }}
            />
            <Typography
              variant="h6"
              sx={{ color: "white", fontWeight: 600, letterSpacing: 0.5 }}
            >
              {user?.name}({user?.role})
            </Typography>
          </Box>
           <Box sx={{ display: "flex", alignItems: "center" }}>
              <a
                href="https://www.linkedin.com/in/jeevakumaran-g-95a2a9235/" // <-- Replace with your LinkedIn URL
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}
              >
                <LinkedInIcon
                  sx={{
                    fontSize: 36,
                    color: "#fff",
                    transition: "transform 0.2s cubic-bezier(.4,2,.6,1)",
                    "&:hover": {
                      color: "#0a66c2",
                      transform: "scale(1.18) rotate(-8deg)",
                    },
                    mx: 1
                  }}
                />
              </a>
            </Box>
          <Button
            color="inherit"
            onClick={logout}
            startIcon={<LogoutIcon />}
            sx={{ fontWeight: 500, textTransform: "none", ml: 1 }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {(user?.role === "admin" || user?.role === "viewer") && (
          <Box ref={formRef}>
            <UserForm
              onSubmit={
                editingUser && user?.role === "admin"
                  ? (data) => handleUpdate(editingUser.id, data)
                  : handleCreate
              }
              user={editingUser && user?.role === "admin" ? editingUser : null}
              onCancel={() => setEditingUser(null)}
            />
          </Box>
        )}
        <div
          className="container"
          style={{
            margin: 0,
            marginBottom: 24,
            padding: 24,
            height: 420,
            width: "100%",
          }}
        >
          <DataGrid
            rows={users}
            columns={columns}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 5 } },
            }}
            sx={{
              border: 0,
              background: "transparent",
              color: "white", // body text
              fontSize: "1rem",

              // Header text black
              "& .MuiDataGrid-columnHeaderTitle": {
                color: "black",
                fontWeight: "bold",
              },

              // Header 3 dots (menu icon) black
              "& .MuiDataGrid-menuIcon": {
                color: "black",
              },

              // Rows and cells transparent
              "& .MuiDataGrid-row, & .MuiDataGrid-cell": {
                background: "transparent",
              },

              // Cell ellipsis icon (if you have it) white
              "& .MuiDataGrid-cellMenuIcon": {
                color: "white",
              },

              // Hover and selected row background gradient
              "& .MuiDataGrid-row:hover": {
                background: "transparent",
              },
              "& .MuiDataGrid-row.Mui-selected, & .MuiDataGrid-row.Mui-selected:hover":
                {
                  background: "transparent",
                },
              "& .MuiDataGrid-menuIcon": {
                color: "black !important",
              },

              // Footer transparent
              "& .MuiDataGrid-footerContainer": { background: "transparent" },

              // Pagination text white
              "& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                { color: "white" },

              // Rows per page styling
              "& .MuiInputBase-root": {
                background: "linear-gradient(90deg, #7c3aed 0%, #6366f1 100%)",
                color: "white",
                borderRadius: 1,
                px: 1,
              },
              "& .MuiDataGrid-menuIconButton .MuiSvgIcon-root, & .MuiDataGrid-menuIconButton:hover .MuiSvgIcon-root, & .MuiDataGrid-menuIconButton:focus .MuiSvgIcon-root, & .MuiDataGrid-menuIconButton:active .MuiSvgIcon-root":
                {
                  color: "black !important",
                },

              // Root and Paper transparent
              "&.MuiDataGrid-root": { background: "transparent" },
              "& .MuiPaper-root": { background: "transparent" },

              // Toolbar gradient background
              "& .MuiDataGrid-toolbarContainer": {
                background: "linear-gradient(90deg, #7c3aed 0%, #6366f1 100%)",
              },

              boxShadow: "none",
            }}
            disableRowSelectionOnClick
            autoHeight={false}
          />
        </div>
      </Container>
    </Box>
  );
}

export default UserDashboard;
