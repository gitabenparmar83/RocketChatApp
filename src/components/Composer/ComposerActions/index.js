import { createClassName, memo } from '../../../../components/helpers';
import styles from './styles.scss';


export const ComposerActions = memo(({ className, style = {}, children }) => (
	<div
		className={createClassName(styles, 'composer__actions', {}, [className])}
		style={style}
	>
		{children}
	</div>
));
