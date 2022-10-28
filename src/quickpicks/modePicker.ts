import type { QuickPickItem } from 'vscode';
import { window } from 'vscode';
import { configuration } from '../configuration';
import { GlyphChars } from '../constants';

export interface ModesQuickPickItem extends QuickPickItem {
	key: string | undefined;
}

export namespace ModePicker {
	export async function show(): Promise<ModesQuickPickItem | undefined> {
		const modes = configuration.get('modes');
		if (modes == null) return undefined;

		const modeKeys = Object.keys(modes);
		if (modeKeys.length === 0) return undefined;

		const mode = configuration.get('mode.active');

		const items = modeKeys.map(key => {
			const modeCfg = modes[key];
			const item: ModesQuickPickItem = {
				label: `${mode === key ? '$(check)\u00a0\u00a0' : '\u00a0\u00a0\u00a0\u00a0\u00a0'}${
					modeCfg.name
				} mode`,
				description: modeCfg.description ? `\u00a0${GlyphChars.Dash}\u00a0 ${modeCfg.description}` : '',
				key: key,
			};
			return item;
		});

		if (mode && modes[mode] != null) {
			items.splice(0, 0, {
				label: `Exit ${modes[mode].name} mode`,
				key: undefined,
			});
		}

		const pick = await window.showQuickPick(items, {
			placeHolder: 'select a GitLens mode to enter',
		});

		return pick;
	}
}
