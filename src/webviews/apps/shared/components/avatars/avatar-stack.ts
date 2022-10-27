import { attr, css, customElement, FASTElement, html, ref, repeat, volatile, when } from '@microsoft/fast-element';
import { srOnly } from '../../../shared/components/styles/a11y';
import { elementBase } from '../../../shared/components/styles/base';

const template = html<AvatarStack>`<template>
	<slot></slot>
</template>`;

const styles = css`
	${elementBase}

	:host {
		display: inline-flex;
		flex-direction: row-reverse;
		justify-content: center;
		align-items: center;
	}

	slot::slotted(*:not(:last-child)) {
		margin-left: calc(var(--avatar-size) * -0.2);
	}

	slot::slotted(*:focus),
	slot::slotted(*:hover) {
		z-index: 1;
	}

	${srOnly}
`;

@customElement({ name: 'avatar-stack', template: template, styles: styles })
export class AvatarStack extends FASTElement {}
