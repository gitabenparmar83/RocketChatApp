import { createClassName, memo } from '../../../../components/helpers';
import styles from './styles.scss';


export const ComposerActions = (props) => {
	const { className, style = {}, children } = props;
	return (
		<div
			className={ createClassName(styles, 'composer__actions', {}, [className]) }
			style={ style }
		>
			{ children }
		</div>
	);
};
