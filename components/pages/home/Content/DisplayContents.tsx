import ContentCard from "./ContentCard";
import { PersonnalContents } from "@/lib/cachedRequests/content/getPersonnalContents";
import ContentCardDeleted from "./ContentCard.showDeleted";

const DisplayContents = ({
  contents,
  showDeleted = false,
}: {
  contents: PersonnalContents;
  showDeleted?: boolean;
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 w-screen">
      {showDeleted
        ? contents.map((content) => (
            <ContentCardDeleted key={content.id} {...content} />
          ))
        : contents.map((content) => (
            <ContentCard key={content.id} {...content} />
          ))}
    </div>
  );
};

export default DisplayContents;
