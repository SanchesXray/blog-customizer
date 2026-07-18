import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import clsx from 'clsx';

import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	currentParams: ArticleStateType;
	onApply: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentParams,
	onApply,
}: ArticleParamsFormProps) => {
	// состояние открытия панели
	const [isPanelOpen, setIsPanelOpen] = useState(false);

	// локальное состояние формы
	const [formState, setFormState] = useState<ArticleStateType>(currentParams);

	// реф для панели
	const panelRef = useRef<HTMLElement>(null);

	// закрытие по клику вне
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				panelRef.current &&
				!panelRef.current.contains(event.target as Node)
			) {
				setIsPanelOpen(false);
			}
		};

		if (isPanelOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isPanelOpen]);

	// переключение панели
	const togglePanel = () => setIsPanelOpen(!isPanelOpen);

	// изменение поля формы
	const handleFieldChange = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setFormState((prev) => ({ ...prev, [key]: value }));
	};

	// отправка формы
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
		setIsPanelOpen(false);
	};

	// сброс формы
	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
		setIsPanelOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isPanelOpen} onClick={togglePanel} />

			<aside
				ref={panelRef}
				className={clsx(styles.container, {
					[styles.container_open]: isPanelOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.formContent}>
						<Text size={31} weight={800} uppercase>
							Задайте параметры
						</Text>

						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={(value) => handleFieldChange('fontFamilyOption', value)}
						/>

						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={(value) => handleFieldChange('fontSizeOption', value)}
						/>

						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={formState.fontColor}
							onChange={(value) => handleFieldChange('fontColor', value)}
						/>

						<Separator />

						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={(value) => handleFieldChange('backgroundColor', value)}
						/>

						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={(value) => handleFieldChange('contentWidth', value)}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
