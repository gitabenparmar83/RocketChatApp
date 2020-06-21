import { createClassName, memo } from '../../../../components/helpers';
import styles from './styles.scss';


export const ComposerAction = (props) => {
	const { text, onClick, className, style = {}, children } = props;
	return (
		<button
			type="button"
			aria-label={text}
			onClick={onClick}
			className={createClassName(styles, 'composer__action', {}, [className])}
			style={style}
		>
			{children}
		</button>
	)
}
