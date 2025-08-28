import React from 'react';

const LargeText = ({ data }) => {
  if (!data) return null;

  const TextTag = data.mainTitle ? 'h1' : 'p';

  return (
    <div className="large-text text-left text-md-center container mb-6">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-10">
          {data.text && (
            <TextTag 
              className="h1"
              dangerouslySetInnerHTML={{ __html: data.text }}
            />
          )}
          {data.cta && (
            <div className="cta-wrapper">
              <a 
                href={data.cta.url} 
                target={data.cta.target || '_self'}
                className="icon-arrow-right mt-3"
              >
                {data.cta.title}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LargeText;
