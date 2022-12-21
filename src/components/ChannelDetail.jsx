import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Videos from "./Videos";
import ChannelCard from "./ChannelCard";
import { fetchAPI } from "../utils/rapidApi";
const ChannelDetail = () => {
  const [channelDetail, setchannelDetail] = useState(null);
  const [videos, setvideos] = useState([]);
  const { id } = useParams();
  // console.log(videos)
  useEffect(() => {
    fetchAPI(`channels?part=snippet&id=${id}`).then((data) =>
      setchannelDetail(data?.items[0])
    );
    fetchAPI(`search?channelId=${id}&part=snippet&order=date`).then((data) =>
      setvideos(data?.items)
    );
  }, [id]);
  return (
    <Box sx={{ background: "#000" }} minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(113,112,142,1) 0%, rgba(222,0,0,1) 47%, rgba(255,138,0,1) 99%)",
            zIndex: 10,
            height: "300px",
          }}
        />
        <ChannelCard marginTop="-110px" channelDetail={channelDetail} />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
