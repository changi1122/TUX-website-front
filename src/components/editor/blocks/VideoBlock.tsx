import { BlockNoteEditor } from "@blocknote/core";
import { insertOrUpdateBlockForSlashMenu } from "@blocknote/core/extensions";
import { createReactBlockSpec, FileBlockWrapper } from "@blocknote/react";
import { MdVideocam } from "react-icons/md";
import { VideoPlayer } from "./video/VideoPlayer";

const VideoBlockComponent = (props: any) => {
  if (props.block.props.url) {
    return (
      <VideoPlayer src={props.block.props.url} poster={props.block.props.poster} />
    );
  }
  return (
    <FileBlockWrapper {...props} buttonIcon={<MdVideocam size={24} />} />
  );
};

export const createVideoBlock = createReactBlockSpec(
  {
    type: "video",
    propSchema: {
      url: { default: "" },
      name: { default: "" },
      caption: { default: "" },
      showPreview: { default: true },
      previewWidth: { default: undefined, type: "number" as const },
      poster: { default: "" },
    },
    content: "none",
  },
  {
    meta: { fileBlockAccept: ["video/*"], selectable: false },
    render: VideoBlockComponent,
  }
);
