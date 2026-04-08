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

export const insertVideoSlashMenuItem = (editor: BlockNoteEditor) => ({
  title: "동영상",
  onItemClick: () =>
    insertOrUpdateBlockForSlashMenu(editor, {
      type: "video" as any,
    }),
  aliases: ["video", "비디오", "영상", "동영상"],
  group: "미디어",
  icon: <MdVideocam size={18} />,
  subtext: "동영상을 삽입합니다",
});
