import "../../public/css/plogs.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ImageListItem from "@mui/material/ImageListItem";

const Plogs = ({ article }) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box
      className="bg-[radial-gradient(ellipse_at_top,rgba(128,0,255,0.5)_0%,rgba(207,163,255,0.36)_45%,rgba(255,255,255,0.57)_100%)]"
      sx={{
        width: 1000,
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        alignContent: "center",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        gridTemplateColumns: "repeat(1, 1fr)",
        transform: "none",
        transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1)",
        gap: "0px",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItem
          key={article}
          disablePadding
          sx={{
            width: "45vw",
            borderRadius: "40px",
            boxShadow: "0 0 20px #4b307e",
          }}
        >
          <ImageListItem
            sx={{
              height: "90%",
              borderRadius: "40px",
              boxShadow: "0 0 20px #4b307e",
            }}
          >
            <img
              style={{
                borderRadius: "40px",
                boxShadow: "0 0 20px #4b307e",
              }}
              src={article.image}
              alt="article image"
            />
          </ImageListItem>
        </ListItem>
      </List>

      <List>
        <ListItem key={article} disablePadding>
          <div className="plog-glass-content  mt-6">
            <h1 style={{ fontSize: "2em" }}>{article.title}</h1>
            <p style={{ fontSize: "1em", marginTop: "12px" }}>
              {article.description}
            </p>
          </div>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div className="plog-container-big gap-96 grid grid-cols-1 ">
      <div className="plog-container grid grid-cols-1 ">
        <div className="plog-card">
          <div className="logo-plog">
            <span className="circle circlr1"></span>
            <span className="circle circlr2"></span>
            <span className="circle circlr3"></span>
            <span className="circle circlr4"></span>
            <span className="circle circlr5">
              <i className="fa-solid fa-seedling"></i>
            </span>
          </div>
          <Button onClick={toggleDrawer(true)}>
            <div
            className="btn_plog_card"
            >
              <img
                className=" object-cover "
                src={article.image}
                alt="product image"
              />
            </div>
          </Button>

          <div className="plog-glass  ">
            <div className="plog-glass-content">
              <h1>{article.title}</h1>
            </div>

            <div className="plog-glass-FT">
              <div className="FT-social">
                <span className="social-icons-FT">
                  <i className="fa-brands fa-facebook"></i>
                </span>
                <span className="social-icons-FT">
                  <i className="fa-brands fa-linkedin"></i>
                </span>
                <span className="social-icons-FT">
                  <i className="fa-brands fa-square-twitter"></i>
                </span>
              </div>
              <Button onClick={toggleDrawer(true)}>
                <div className="FT-link">
                  Read More{" "}
                  <i className="fa-solid fa-arrow-up-right-square"></i>
                </div>
              </Button>
              <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
              </Drawer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plogs;