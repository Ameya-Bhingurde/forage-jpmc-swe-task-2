import React, { Component } from 'react';
import { Table } from '@finos/perspective';
import { ServerRespond } from './DataStreamer';
import './Graph.css';

/**
 * Props declaration for <Graph />
 */
interface IProps {
  data: ServerRespond[],
}

/**
 * Perspective library adds load to HTMLElement prototype.
 * This interface acts as a wrapper for Typescript compiler.
 */
interface PerspectiveViewerElement extends HTMLElement {
  load: (table: Table) => void,
}

/**
 * React component that renders Perspective based on data
 * parsed from its parent through data property.
 */
class Graph extends Component<IProps, {}> {
  // Perspective table
  table: Table | undefined;

  render() {
    return React.createElement('perspective-viewer');
  }

  componentDidMount() {
    // Get element to attach the table from the DOM.
    const elem = document.getElementsByTagName('perspective-viewer')[0] as unknown as PerspectiveViewerElement;

    const schema = {
      stock: 'string',
      top_ask_price: 'float',
      top_bid_price: 'float',
      timestamp: 'date',
    };

    if (window.perspective && window.perspective.worker()) {
      this.table = window.perspective.worker().table(schema);
    }
    if (this.table) {
      // Load the `table` in the `<perspective-viewer>` DOM reference.

     
     
      elem.setAttribute('view','y_line');
      elem.setAttribute('column-pivots','["stocks"]');
      elem.setAttribute('row-pivots','["timestamps"]');
      elem.setAttribute('columns','["top_ask_price"]');
      elem.setAttribute('aggregates',
      {
        "stocks:": distinct, count, ",": "top_ask_price", "avg',": "top_bid_price", "avg": ,
        "timestamp": "distinct count",
        charAt: function (pos: number): string {
          throw new Error('Function not implemented.');
        },
        charCodeAt: function (index: number): number {
          throw new Error('Function not implemented.');
        },
        concat: function (...strings: string[]): string {
          throw new Error('Function not implemented.');
        },
        indexOf: function (searchString: string, position?: number | undefined): number {
          throw new Error('Function not implemented.');
        },
        lastIndexOf: function (searchString: string, position?: number | undefined): number {
          throw new Error('Function not implemented.');
        },
        localeCompare: function (that: string): number {
          throw new Error('Function not implemented.');
        },
        match: function (regexp: string | RegExp): RegExpMatchArray | null {
          throw new Error('Function not implemented.');
        },
        replace: function (searchValue: string | RegExp, replaceValue: string): string {
          throw new Error('Function not implemented.');
        },
        search: function (regexp: string | RegExp): number {
          throw new Error('Function not implemented.');
        },
        slice: function (start?: number | undefined, end?: number | undefined): string {
          throw new Error('Function not implemented.');
        },
        split: function (separator: string | RegExp, limit?: number | undefined): string[] {
          throw new Error('Function not implemented.');
        },
        substring: function (start: number, end?: number | undefined): string {
          throw new Error('Function not implemented.');
        },
        toLowerCase: function (): string {
          throw new Error('Function not implemented.');
        },
        toLocaleLowerCase: function (locales?: string | string[] | undefined): string {
          throw new Error('Function not implemented.');
        },
        toUpperCase: function (): string {
          throw new Error('Function not implemented.');
        },
        toLocaleUpperCase: function (locales?: string | string[] | undefined): string {
          throw new Error('Function not implemented.');
        },
        trim: function (): string {
          throw new Error('Function not implemented.');
        },
        length: 0,
        substr: function (from: number, length?: number | undefined): string {
          throw new Error('Function not implemented.');
        },
        codePointAt: function (pos: number): number | undefined {
          throw new Error('Function not implemented.');
        },
        includes: function (searchString: string, position?: number | undefined): boolean {
          throw new Error('Function not implemented.');
        },
        endsWith: function (searchString: string, endPosition?: number | undefined): boolean {
          throw new Error('Function not implemented.');
        },
        normalize: function (form: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'): string {
          throw new Error('Function not implemented.');
        },
        repeat: function (count: number): string {
          throw new Error('Function not implemented.');
        },
        startsWith: function (searchString: string, position?: number | undefined): boolean {
          throw new Error('Function not implemented.');
        },
        anchor: function (name: string): string {
          throw new Error('Function not implemented.');
        },
        big: function (): string {
          throw new Error('Function not implemented.');
        },
        blink: function (): string {
          throw new Error('Function not implemented.');
        },
        bold: function (): string {
          throw new Error('Function not implemented.');
        },
        fixed: function (): string {
          throw new Error('Function not implemented.');
        },
        fontcolor: function (color: string): string {
          throw new Error('Function not implemented.');
        },
        fontsize: function (size: number): string {
          throw new Error('Function not implemented.');
        },
        italics: function (): string {
          throw new Error('Function not implemented.');
        },
        link: function (url: string): string {
          throw new Error('Function not implemented.');
        },
        small: function (): string {
          throw new Error('Function not implemented.');
        },
        strike: function (): string {
          throw new Error('Function not implemented.');
        },
        sub: function (): string {
          throw new Error('Function not implemented.');
        },
        sup: function (): string {
          throw new Error('Function not implemented.');
        },
        padStart: function (maxLength: number, fillString?: string | undefined): string {
          throw new Error('Function not implemented.');
        },
        padEnd: function (maxLength: number, fillString?: string | undefined): string {
          throw new Error('Function not implemented.');
        },
        trimEnd: function (): string {
          throw new Error('Function not implemented.');
        },
        trimStart: function (): string {
          throw new Error('Function not implemented.');
        },
        trimLeft: function (): string {
          throw new Error('Function not implemented.');
        },
        trimRight: function (): string {
          throw new Error('Function not implemented.');
        },
        matchAll: function (regexp: RegExp): IterableIterator<RegExpMatchArray> {
          throw new Error('Function not implemented.');
        },
        replaceAll: function (searchValue: string | RegExp, replaceValue: string): string {
          throw new Error('Function not implemented.');
        },
        at: function (index: number): string | undefined {
          throw new Error('Function not implemented.');
        },
        [Symbol.iterator]: function (): IterableIterator<string> {
          throw new Error('Function not implemented.');
        }
      });
      elem.load(this.table);
    }
  }

  componentDidUpdate() {
    // Everytime the data props is updated, insert the data into Perspective table
    if (this.table) {
      // As part of the task, you need to fix the way we update the data props to
      // avoid inserting duplicated entries into Perspective table again.
      this.table.update(this.props.data.map((el: any) => {
        // Format the data from ServerRespond to the schema
        return {
          stock: el.stock,
          top_ask_price: el.top_ask && el.top_ask.price || 0,
          top_bid_price: el.top_bid && el.top_bid.price || 0,
          timestamp: el.timestamp,
        };
      }));
    }
  }
}

export default Graph;
