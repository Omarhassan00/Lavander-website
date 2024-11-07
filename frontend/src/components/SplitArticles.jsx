import "../../public/css/plogs.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ImageListItem from "@mui/material/ImageListItem";

const SpiltArticles = ({ article }) => {
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
            <h1 style={{ fontSize: "2em",borderBottom: "2px double",display: "flex",textAlign: "center",alignItems: "center",justifyContent: "center",}}>
              {article.title}
              </h1>
            <p style={{ fontSize: "1em", marginTop: "12px",display:" flex",alignItems: "center",textAlign: "center",padding: "0px 20px",}}>
              {article.description}
            </p>
          </div>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <div
          className="btn_plog_card_fet rounded-md">
          <img
            className=" object-cover w-full h-full rounded-md"
            src={article.image}
            alt="product image"
          />
        </div>
      </Button>
      <div id="Text_l" className="p-4 flex justify-center align-middle rounded-md  shadow-xl"
      style={{background:"linear-gradient(to top, rgb(137 40 203), transparent)"}}
      >
        <h3 className="text-lg font-semibold mb-2 text-purple-950 ">
          {article.title}
        </h3>
        </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};
export default SpiltArticles;
