import { Video } from "@prisma/client";

type Props = {
  video: Video
};

const convertYtToEmbed = (url: string) => {
    const urlObj = new URL(url);
        let videoId = "";
        if (urlObj.hostname.includes("youtu.be")) {
            videoId = urlObj.pathname.substring(1);
        } else if (urlObj.hostname.includes("youtube.com")) {
            if (urlObj.searchParams.has("v")) {
                videoId = urlObj.searchParams.get("v")!;
            } else if (urlObj.pathname.includes("/embed/") || urlObj.pathname.includes("/v/")) {
                videoId = urlObj.pathname.split("/").pop()!;
            }
    }
    return `https://www.youtube.com/embed/${videoId}`;
}

const YtMainCard = async ({ video }: Props) => {
  return <div className="space-y-2">
      <div key={video.id} className="rounded-lg flex justify-center">
        <iframe height={210} className="rounded-lg w-72" src={`${convertYtToEmbed(video.link)}`} ></iframe>
      </div>
  </div>;
};

export default YtMainCard;
