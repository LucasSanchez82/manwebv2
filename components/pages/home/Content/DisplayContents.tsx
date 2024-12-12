import ContentCard from "./ContentCard";
import { PersonnalContents } from "@/lib/cachedRequests/content/getPersonnalContents";
import ContentCardDeleted from "./ContentCard.showDeleted";
import CustomPagination from "@/components/global/CustomPagination";

const DisplayContents = ({
  contents,
  showDeleted = false,
  itemsCount,
}: {
  contents: PersonnalContents;
  itemsCount: number;
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
      <CustomPagination itemsCount={itemsCount} />
    </div>
  );
};

export default DisplayContents;
