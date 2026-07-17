import { useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterOptionSubmit } from './hooks/useEnterOptionSubmit';

import styles from './Select.module.scss';

type OptionProps = {
	option: OptionType;
	onClick: (value: OptionType['value']) => void;
	isSelected?: boolean;
};

export const Option = (props: OptionProps) => {
	const {
		option: { value, title, optionClassName, className },
		onClick,
		isSelected = false,
	} = props;
	const optionRef = useRef<HTMLLIElement>(null);

	const handleClick =
		(clickedValue: OptionType['value']): MouseEventHandler<HTMLLIElement> =>
		() => {
			if (!isSelected) {
				onClick(clickedValue);
			}
		};

	useEnterOptionSubmit({
		optionRef,
		value,
		onClick,
	});

	return (
		<li
			className={clsx(styles.option, styles[optionClassName || ''])}
			value={value}
			onClick={handleClick(value)}
			tabIndex={isSelected ? -1 : 0}
			data-testid={`select-option-${value}`}
			ref={optionRef}
			data-selected={isSelected}
			aria-selected={isSelected}>
			<Text family={isFontFamilyClass(className) ? className : undefined}>
				{title}
			</Text>
		</li>
	);
};
