"use client";

import { CustomButtonProps } from "@/types";
import Image from "next/image";

const CustomButton = ({
	title,
	btnType,
	textStyles,
	rightIcon,
	containerStyles,
	handleClick,
}: CustomButtonProps) => {
	return (
		<div>
			<button
				disabled={false}
				type={btnType || "button"}
				className={`custom-btn ${containerStyles}`}
				onClick={handleClick}
			>
				<span className={`flex-1 ${textStyles}`}>{title}</span>
				{rightIcon && (
					<div className="relative w-6 h-6">
						<Image
							src={rightIcon}
							alt="Right Icon"
							fill
							className="object-contain"
						/>
					</div>
				)}
			</button>
		</div>
	);
};

export default CustomButton;
