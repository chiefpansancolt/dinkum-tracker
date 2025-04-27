import React from "react";
import { Book } from "@/types";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemFooter from "@/playthrough/ui/itemcard/ItemFooter";

interface BookCardProps {
	book: Book;
	isCollected: boolean;
	onToggleCollected: (id: string, isCollected: boolean) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, isCollected, onToggleCollected }) => {
	return (
		<ItemCard
			renderHeader={() => <ItemHeader title={book.name} />}
			renderImage={() => (
				<ItemImage src={book.img} name={book.name} isCollected={isCollected} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					{book.details.map((detail, index) => (
						<div
							key={index}
							className="grid grid-cols-1 gap-2 rounded-lg bg-gray-100 p-3 dark:bg-gray-900"
						>
							<ItemDetail label="Acquired From" details={detail.aquiredFrom} />

							<ItemDetail label="Requirements" details={detail.requirements} />

							{detail.buyingPrice > 0 && (
								<DinkValue label="Buy Price" price={detail.buyingPrice} />
							)}

							{detail.sellingPrice > 0 && (
								<DinkValue
									label="Sell Price"
									price={detail.sellingPrice}
									showCommerceLicenses
								/>
							)}
						</div>
					))}
				</div>
			)}
			renderFooter={() => (
				<ItemFooter
					id={book.id}
					leftLabel="Collected"
					isLeftChecked={isCollected}
					handleLeftToggle={(id, checked) => onToggleCollected(id, checked)}
				/>
			)}
		/>
	);
};

export default BookCard;
