"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import SearchManufacturer from "./SearchManufacturer";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
	<button className={`-ml-3 z-10 ${otherClasses}`} type="submit">
		<Image
			src="/magnifying-glass.svg"
			alt="Magnifying Glass"
			width={40}
			height={40}
			className="object-contain"
		/>
	</button>
);

const SearchBar = () => {
	const [manufacturer, setManufacturer] = useState("");
	const [model, setModel] = useState("");
	const router = useRouter();

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (manufacturer === "" && model === "") {
			return alert("Please fill in the search bar");
		}

		updateSearchParams(
			model.toLocaleLowerCase(),
			manufacturer.toLocaleLowerCase()
		);
	};

	const updateSearchParams = (modal: string, manufacturer: string) => {
		const searchParams = new URLSearchParams(window.location.search);

		if (model) {
			searchParams.set("model", model);
		} else {
			searchParams.delete("model");
		}

		if (manufacturer) {
			searchParams.set("manufacturer", manufacturer);
		} else {
			searchParams.delete("manufacturer");
		}

		const newPathName = `${
			window.location.pathname
		}?${searchParams.toString()}`;

		router.push(newPathName, {scroll: false});
	};

	return (
		<form className="searchbar" onSubmit={handleSearch}>
			<div className="searchbar__item">
				<SearchManufacturer
					manufacturer={manufacturer}
					setManufacturer={setManufacturer}
				/>
				<SearchButton otherClasses="sm:hidden" />
				<div className="searchbar__item">
					<Image
						src="/model-icon.png"
						width={25}
						height={25}
						className="absolute w-[20px] h-[20px] ml-4"
						alt="Car Model"
					/>
					<input
						type="text"
						name="model"
						value={model}
						onChange={(e) => setModel(e.target.value)}
						placeholder="Tiguan"
						className="searchbar__input"
					/>
					<SearchButton otherClasses="sm:hidden" />
				</div>
				<SearchButton otherClasses="max-sm:hidden" />
			</div>
		</form>
	);
};

export default SearchBar;
