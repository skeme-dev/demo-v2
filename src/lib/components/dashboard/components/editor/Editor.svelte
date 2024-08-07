<script lang="ts">
	// @ts-nocheck

	import { onMount, onDestroy } from 'svelte';
	import { Editor, getAttributes, isActive } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Focus from '@tiptap/extension-focus';
	import BulletList from '@tiptap/extension-bullet-list';
	import History from '@tiptap/extension-history';
	import Placeholder from '@tiptap/extension-placeholder';
	import Underline from '@tiptap/extension-underline';
	import Link from '@tiptap/extension-link';
	import Image from '@tiptap/extension-image';
	import MenuItem from './MenuItem.svelte';
	import BubbleMenu from '@tiptap/extension-bubble-menu';
	import BubbleLinkMenu from './BubbleLinkMenu.svelte';
	import Button from '../../ui/button/button.svelte';
	import CropDialog from './CropDialog.svelte';
	import * as Alert from '$lib/components/dashboard/ui/alert/index';
	import { getImageSizes } from '$lib/utils/image';

	let element;
	let editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit.configure({
					orderedList: {
						HTMLAttributes: {
							class: 'list-decimal pl-6'
						}
					},
					bulletList: {
						HTMLAttributes: {
							class: 'list-disc pl-6'
						}
					},
					heading: {
						levels: [2],
						HTMLAttributes: {
							class: 'text-xl font-semibold'
						}
					}
				}),
				Placeholder.configure({
					placeholder: ({ node }) => {
						if (node.type.name === 'heading') {
							return 'What’s the title?';
						}

						return 'Schreibe deinen Bericht...';
					}
				}),
				Underline,
				Link.configure({
					HTMLAttributes: {
						class: 'bg-red-100'
					}
				}),
				Image,
				BubbleMenu
			],
			content: '<a href="http://localhost:5173/dashboard/editor">Link</a>',
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
		// document.getElementsByClassName('.tiptap.ProseMirror')[0].classList.add('outline-none');
		document.querySelector('.tiptap.ProseMirror')?.classList.add('outline-none');
		document.querySelector('.tiptap.ProseMirror')?.classList.add('p-6');
		document.querySelector('.tiptap.ProseMirror')?.classList.add('h-full');

		if (!editor) {
			alert('reload!');
		}
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

	const editorActions = [
		{
			icon: 'arrow-go-back-line',
			title: 'Rückgängig machen',
			action: () => editor.commands.undo(),
			disable: () => !editor.can().undo()
		},
		{
			icon: 'arrow-go-forward-line',
			title: 'Wiederholen',
			action: () => editor.commands.redo(),
			disable: () => !editor.can().redo()
		},
		{
			type: 'divider'
		},
		{
			icon: 'bold',
			title: 'Fett',
			action: () => editor.chain().focus().toggleBold().run(),
			isActiveString: 'bold'
		},
		{
			icon: 'italic',
			title: 'Kursiv',
			action: () => editor.chain().focus().toggleItalic().run(),
			isActiveString: 'italic'
		},
		{
			icon: 'underline',
			title: 'Unterstreichen',
			action: () => editor.chain().focus().toggleUnderline().run(),
			isActiveString: 'underline'
		},
		{
			icon: 'strikethrough',
			title: 'Durchstreichen',
			action: () => editor.chain().focus().toggleStrike().run(),
			isActive: () => 'strike'
		},
		{
			type: 'divider'
		},
		{
			icon: 'list-unordered',
			title: 'Ungeordnete Liste',
			action: () => editor.chain().focus().toggleBulletList().run(),
			isActiveString: 'bulletList'
		},
		{
			icon: 'list-ordered-2',
			title: 'Geordnete Liste',
			action: () => editor.chain().focus().toggleOrderedList().run(),
			isActiveString: 'orderedList'
		},
		{
			icon: 'separator',
			title: 'Horizontale Linie',
			action: () => editor.chain().focus().setHorizontalRule().run(),
			isActive: null
		},
		{
			type: 'divider'
		},
		{
			icon: 'link-m',
			title: 'Link',
			action: () =>
				editor.chain().focus().toggleLink({ href: currentLink, target: '_blank' }).run(),
			isActiveString: 'link'
		},
		{
			icon: 'image-add-line',
			title: 'Bild',
			action: () => editor.chain().focus().toggleStrike().run(),
			isActive: () => editor.isActive('strike')
		}
	];

	let currentLink;
	let canSave: boolean = false;
	let linkInput;

	let imageFiles = [];
	let previewImageURL =
		'https://imgs.search.brave.com/q6GdWLCcqsVN-3aK5xK2ctlTiQl-v5exeePIjQ1knxk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/Zm90by1rdXJzLmNv/bS9iaWxkZXIvZm90/by1ob2Noa2FudC0z/NzgxLmpwZw';
	let mainImageInput;
	let croppedImageOutput;
	let previewImage;
	let sizes;
	let container;

	let correctAspect = false;

	const desiredAspectRatio = 8 / 5;

	onMount(async () => {
		sizes = await getImageSizes(previewImageURL);
		correctAspect = sizes.w > sizes.h;
	});

	$: if (imageFiles) {
		if (imageFiles.length !== 0) previewImageURL = URL.createObjectURL(imageFiles[0]);
	}

	$: if (croppedImageOutput) {
		imageFiles = [];
		correctAspect = true;
		previewImage.src = croppedImageOutput;
	}

	async function saveBlogPost(headline: string, content: string, author, image);
</script>

<div class="flex flex-col w-2/3 mt-6">
	{#if editor}
		<h1 class="text-gray-600 text-sm font-semibold mb-3">Bild</h1>
		<div
			class={`flex flex-col ${
				imageFiles.length === 0 && 'py-12'
			} justify-center items-center w-full rounded-lg border-2 bg-white p-3`}
		>
			{#if imageFiles.length !== 0}
				<div class="flex justify-center items-center flex-col space-y-3">
					<input
						bind:files={imageFiles}
						type="file"
						class="hidden"
						bind:this={mainImageInput}
						accept="image/png, image/jpeg"
					/>
					<i class="text-3xl ri-image-circle-line" />
					<p class="text-xs text-gray-600 font-semibold">Lade ein Bild für den Titel hoch.</p>
					<Button size="sm" variant="outline" on:click={() => mainImageInput.showPicker()}
						>Hochladen</Button
					>
				</div>
			{:else}
				<div class="w-full flex flex-col space-y-3">
					<div class="flex justify-center max-h-[60vh]">
						<img
							id="pv-image"
							class="rounded-lg w-fit"
							bind:this={previewImage}
							src={previewImageURL}
							alt=""
						/>
					</div>
					{#if !correctAspect}
						<div bind:this={container} class={`!my-6`}>
							<Alert.Root variant="destructive">
								<Alert.Title>
									<i class="ri-error-warning-line" />
									Achte auf das Format
								</Alert.Title>
								<Alert.Description
									>Das Bild entspricht nicht dem benötigten Format. Schneide das Bild im passenden
									Format zu.</Alert.Description
								>
							</Alert.Root>
						</div>
					{/if}
					<div class="flex w-full space-x-3 {correctAspect && '!mt-6'}">
						<Button class="w-1/3" variant="outline" on:click={() => (imageFiles = [])}
							>Anderes Bild</Button
						>
						<CropDialog imageUrl={previewImageURL} bind:croppedImageOutput />

						<Button class="w-1/3">Bild verwenden</Button>
					</div>
				</div>
			{/if}
		</div>
		<div class="flex flex-col w-full mt-6">
			<h1 class="text-gray-600 text-sm font-semibold">Inhalt</h1>
			<div class="w-full flex space-x-4 border-2 rounded-lg mt-3 bg-white p-3">
				{#each editorActions as editorAction}
					{#if editorAction.type !== 'divider'}
						<MenuItem
							action={editorAction.action}
							icon={editorAction.icon}
							title={editorAction.title}
							isActive={editorAction.isActiveString && editor.isActive(editorAction.isActiveString)}
							disable={editorAction.disable}
						/>
					{:else}
						<div class="" />
					{/if}
				{/each}
			</div>
			<BubbleLinkMenu
				{editor}
				tippyOptions={{
					// triggerTarget: document.getElementsByTagName('a'),
					onTrigger: () => alert('test')
				}}
				shouldShow={({ editor, view, state, oldState, from, to }) => {
					// only show the bubble menu for images and links
					currentLink = editor.getAttributes('link').href;
					return editor.isActive('image') || editor.isActive('link');
				}}
			>
				<div class="bg-white shadow-xl divide-x-2 border-2 flex rounded-lg">
					<input
						bind:value={currentLink}
						on:focus={() => {
							canSave = true;
						}}
						class="text-sm py-1 px-2 mr-1 outline-none rounded-l-lg"
						type="url"
					/>
					<div class="flex space-x-1 p-1">
						<button
							on:click={() => {
								editor.commands.setLink({ href: currentLink, target: '_blank' });
							}}
							disabled={!canSave}
							class={`w-9 h-8 rounded-lg ${canSave ? 'hover:bg-gray-100' : 'text-gray-300'}`}
							title="Link speichern"
						>
							<i class="text-lg ri-check-line" />
						</button>
						<button
							on:click={() => window.open(currentLink)}
							class="w-9 h-8 rounded-lg hover:bg-gray-100"
							title="Link öffnen"
						>
							<i class="text-lg ri-eye-line" />
						</button>
						<button
							on:click={() => editor.commands.unsetLink()}
							class="w-9 h-8 rounded-lg hover:bg-red-100 text-red-600"
							title="Link entfernen"
						>
							<i class="text-lg ri-delete-bin-line" />
						</button>
					</div>
				</div>
			</BubbleLinkMenu>
		</div>
	{/if}
</div>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	id="editor"
	on:click={() => editor.chain().focus()}
	class="bg-white w-2/3 h-[200%] border-2 rounded-lg mt-6 cursor-text"
	bind:this={element}
/>
