from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.errors = []
        self.void_elements = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}
        self.line = 0

    def handle_starttag(self, tag, attrs):
        if tag not in self.void_elements:
            self.stack.append((tag, self.getpos()[0]))

    def handle_endtag(self, tag):
        if tag in self.void_elements:
            return
        if not self.stack:
            self.errors.append(f"Line {self.getpos()[0]}: Unexpected closing tag </{tag}> (stack is empty)")
            return
        
        # Pop matching tag
        top, top_line = self.stack.pop()
        if top != tag:
            self.errors.append(f"Line {self.getpos()[0]}: Mismatched closing tag </{tag}> (expected </{top}> opened at line {top_line})")

parser = MyHTMLParser()
try:
    with open('/Users/gowthamshanmugam/Desktop/Mara/index.html', 'r') as f:
        parser.feed(f.read())
    
    if parser.errors:
        for err in parser.errors:
            print(err)
    elif parser.stack:
        print("Unclosed tags:", parser.stack)
    else:
        print("HTML is well-formed!")
except Exception as e:
    print("Error:", e)
